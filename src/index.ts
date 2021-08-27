import {VaccinationCenter} from "./types";
import {getCenters, findEligibleCenters} from "./lib";

const interval = 15 * 1000;
const districts = {
  505: "Jaipur I",
  506: "Jaipur II",
};

const alert = (centers: Array<VaccinationCenter>) => {
  // console.log(`${centers.length} centers found`);
  process.stdout.write("\x07");
};

const performTask = async () => {
  try {
    const fetchedCenters = await getCenters({ districts: Object.keys(districts) });
    const centers = findEligibleCenters(fetchedCenters);
    console.log(`${centers.length} centers found at ${new Date().toString()}`);
    if (centers.length > 0) {
      console.group("Centers");
      centers.forEach(({ name, district_name, pincode, sessions }) => {
        console.log(name, district_name, pincode, sessions[0]?.vaccine);
      });
      console.groupEnd();
      alert(centers);
      return true;
    }
  } catch (err) {
    console.log(`Request failed at ${new Date().toString()}`, err.message);
    console.error(err.stack);
    return false;
  }

  return false;
};

const startTask = async () => {
  performTask();
  setInterval(() => {
    performTask();
  }, interval);
};

startTask();

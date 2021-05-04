import axios from "axios";
import { VaccinationCenter } from "./types";

const endPoint =
  "https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict";

const interval = 60 * 1000;
const districts = {
  505: "Jaipur I",
  506: "Jaipur II",
};

const fetchCenters = async () => {
  const currentDate = new Date();
  const date = `${currentDate.getDate().toString().padStart(2, "0")}-${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${currentDate.getFullYear()}`;

  const result = await Promise.allSettled(
    Object.keys(districts).map((district) =>
      axios.get(endPoint, {
        params: {
          district_id: district,
          date,
        },
      })
    )
  );

  const allCenters = result.reduce((acc: Array<VaccinationCenter>, item) => {
    if (item.status !== "fulfilled") return acc;
    if (item.value.data) {
      const {
        centers,
      }: { centers: Array<VaccinationCenter> } = item.value.data;
      acc.push(...centers);
    }
    return acc;
  }, []);

  return allCenters;
};

const findCenters = (list: Array<VaccinationCenter>) => {
  const eligibleCenters = list.filter((center: VaccinationCenter) =>
    center.sessions.some(
      (session) =>
        session.min_age_limit === 18 && session.available_capacity > 0
    )
  );
  return eligibleCenters;
};

const alert = (centers: Array<VaccinationCenter>) => {
  console.log(`${centers.length} centers found`);
  process.stdout.write("\x07");
};

const performTask = async () => {
  try {
    const fetchedCenters = await fetchCenters();
    const centers = findCenters(fetchedCenters);
    console.log(`${centers.length} centers found at ${new Date().toString()}`);
    if (centers.length > 0) {
      console.group("Centers");
      centers.forEach(({ name, district_name, pincode }) => {
        console.log(name, district_name, pincode);
      });
      console.groupEnd();
      alert(centers);
      return true;
    }
  } catch (err) {
    console.log(`Request failed at ${new Date().toString()}`, err.message);
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

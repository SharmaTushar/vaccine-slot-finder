const axios = require('axios');

const endPoint = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin'

const interval = 60 * 1000;
const pincode = '302020';

const findCenters = (list) => {
  const eligibleCenters = list.centers.filter(center => center.sessions.some(session => session.min_age_limit === 18 && session.available_capacity > 0));
  return eligibleCenters;
};

const alert = (centers) => {
  console.log(`${centers.length} centers found`);
  process.stdout.write('\x07');
};

const performTask = async () => {
  const currentDate = new Date();
  const params = {
    pincode,
    date: `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`
  };

  try {
    const result = await axios.get(endPoint, {
      params
    });
    const centers = findCenters(result.data);
    console.log(`${centers.length} centers found at ${new Date().toString()}`);
    if (centers.length > 0) {
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
  const isTaskSuccessful = await performTask();
  if (isTaskSuccessful) process.exit(0);

  let runner = setInterval(() => {
    performTask().then(isComplete => {
      if (isComplete) {
        clearInterval(runner);
        process.exit(0);
      }
    })
  }, interval);
};

startTask();

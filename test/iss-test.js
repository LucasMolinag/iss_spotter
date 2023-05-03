const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP(ip, (error, latitude, longitude) => {
  if (error) {
    console.log("It didn't work", error);
    return
  }
  console.log('It worked! Returned coordinates:', `\nlatitude: ${latitude}`, `\nlongitude: ${longitude}`);
});

fetchISSFlyOverTimes(latitude, longitude, (error, passingTimes) => {
  if (error) {
    console.log("It didn't work", error);
    return
  }
  console.log('It worked! Returned passing times:', passingTimes);
});
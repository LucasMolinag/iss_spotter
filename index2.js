const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printPassingTimes } = require('./index');

nextISSTimesForMyLocation()
  .then((passingTimes) => {
    printPassingTimes(passingTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });


const { nextISSTimesForMyLocation } = require('./iss');

const printPassingTimes = function(passingTimes) {
  for (const pass of passingTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passingTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassingTimes(passingTimes);
});

module.exports = { printPassingTimes };
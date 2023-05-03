const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) { 
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    if (error) {
      callback(error, null);
      console.error(`API returned status code ${response.statusCode}`);
    } else {
      const ip = JSON.parse(body).ip;
      callback(null, ip);
    }
  });
}

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null, null);
      console.error(`API returned status code ${response.statusCode}`);
    } else {
      const latitude = JSON.parse(body).latitude;
      const longitude = JSON.parse(body).longitude;
      callback(null, latitude, longitude);
    }
  });
}

const fetchISSFlyOverTimes = function(latitude, longitude, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      console.error(`API returned status code ${response.statusCode}`);
    } else {
      const passingTimes = JSON.parse(body).response;
      callback(null, passingTimes);
    }
  });
}

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => { 
      if (error) {
        return callback(error, null);
  }

    fetchCoordsByIP(ip, (error, lat, long) => {
        if (error) {
          return callback(error, null, null);
        }

        fetchISSFlyOverTimes(lat, long, (error, nextFlyoverTimes) => {
          if (error) {
            return callback(error, null);
          }
          callback(null, nextFlyoverTimes)
        });
      });
    });
  };

module.exports = { fetchMyIP };
module.exports = { fetchCoordsByIP };
module.exports = { fetchISSFlyOverTimes };
module.exports = { nextISSTimesForMyLocation };
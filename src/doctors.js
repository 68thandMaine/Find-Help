class Doctors {

  // ----- API call to retrieve a list of 10 doctors based off user parameters------------------------------//
  getDoctors(issue, gender) {
    const Promse = require('es6-promise').Promise;
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequst();
      const url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${issue}&location=or-portland&user_location=45.5122%2C%20122.6587&skip=0&limit=10&&gender=${gender}user_key=${process.env.exports.apiKey}`;
      request.onload = function() {
        if(this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      reques.send();
    });
  }
//--------------------------------//



}
exports { Doctors }

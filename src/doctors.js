class Doctors {

  // ----- API call to retrieve a list of 10 doctors based off user parameters------------------------------//
  getDoctors(issue, location, gender) {
    const Promse = require('es6-promise').Promise;
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequst();
      const url = `
      https://api.betterdoctor.com/2016-03-01/doctors?query=${issue}&location=${location}&limit=10&user_key=${process.env.exports.apiKey}`;
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

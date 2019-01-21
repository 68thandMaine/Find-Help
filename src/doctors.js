class Doctors {

  getDoctors(issue, gender) {
    const Promse = require('es6-promise').Promise;
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      const url =
      `https://api.betterdoctor.com/2016-03-01/doctors?query=${issue}&gender=${gender}&location=or-portland&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
      request.onload = function() {
        if(this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(`<div class="card">
          <div class="card-body">
          <h5 class="card-title">Uh Oh!</h5>
          <h6 class="card-subtitle mb-2 text-muted">We don't quite understand what you're searching for.</h6>
          <p class="card-text">Please make sure all form fields have an option selected and try again!</p>
          <p class="card-text mb-2 text-muted">The error you encountered was due to a ${request.statusText}</p>
          <button type="button" class="btn btn-secondary" id="backToSearch">Back to Search</button>
          </div>
          </div>`));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }



}
export { Doctors };

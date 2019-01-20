class KnownConditions {
  constructor() {
    this.listOfConditions = [];
  }

condtions() {
  const Promse = require('es6-promise').Promise;
  return new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest();
    const url =` https://api.betterdoctor.com/2016-03-01/conditions?user_key=${process.env.exports.apiKey}`;
    request.onload = function() {
      if(this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    }
    request.open("GET", url, true);
    request.send();
  });
}

knownConditionsList(response) {
  const parsedResponse = JSON.parse(response);
  parsedResponse.data.forEach((illness) => {
    if(this.missingFromList(illness.name)) this.listOfConditions.push(illness.name);
  });
  this.listOfConditions.sort();
}

missingFromList(name) {
  return (!this.listOfConditions.includes(name));
}

}
export { KnownConditions };

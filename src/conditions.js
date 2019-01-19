class KnownConditions {

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
  const knownConditionList = [];
  const response = JSON.parse(response);
  response.data.forEach((illness) => {
    if(this.missingCondition(illness.name)) this.conditionsList.push(illness.name);
  });
  return knownConditionList.sort();
}

missingCondition(name) {
  return (!this.)
}

}
export { KnownConditions };

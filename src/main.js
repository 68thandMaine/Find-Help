import { Doctors } from './doctors.js';
import { KnownConditions } from './conditions.js';
import { buildDoctorCards } from './ui-logic.js';
import $ from 'jquery';
import './styles.css';
import 'bootstrap';

// ------ Condtion promise function -------//
function getConditions() {
  const knownConditions = new KnownConditions();
  let conditionsPromise = knownConditions.conditions();
console.log("conditionsPromise: " + conditionsPromise );
  conditionsPromise.then((response) => {
    knownConditions.knownConditionsList(response);
    buildConditionOptions(knownConditions.listOfConditions);
  });
}

function buildConditionOptions(illnesses) {
  illnesses.forEach((illness) => {
    $('#conditionSelection').append(`<option value="${illness}">${illness}</option>`);
  });
}

// ----- /condition building ------//

// ----- page functions -------//

function resetForm(){
  $('#conditionSelection').val('');
  $('#genderSelection').val('');
}

$(document).ready(function() {
  getConditions();
  const doctors = new Doctors();

  $('.searchForm').submit(function(event) {
    event.preventDefault();

    let medicalIssue = $('#conditionSelection').val();
    let gender = $('#genderSelection').val();
    resetForm();
    if($("#conditionSelection").val() || $("#genderSelection").val() === ' ') {
      return alert("Please select both a condition and a gender")
    }

    let getListOfDoctorsPromise = doctors.getDoctors(medicalIssue, gender);
    getListOfDoctorsPromise.then(function(response) {
      let body = JSON.parse(response);
      buildDoctorCards(body);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your requst: ${error.message}`);
    });



  });
});

import { Doctors } from './doctors.js';
import { KnownConditions } from './conditions.js';
import { buildDoctorCards } from './ui-logic.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap';
import $ from 'jquery';
import './styles.css';

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

function returnToForm(){
  $(".showErrors").on("click", "button", function(){
    $('.showErrors').empty();
    $('.searchForm').show();
    $('#searchSubmit').show();
  });
}

function resetDocSpecs(){
  $(".doctorInfo").empty();
}

$(document).ready(function() {
  getConditions();
  const doctors = new Doctors();

  $('#searchSubmit').click(function() {
    resetDocSpecs();
    let medicalIssue = $('#conditionSelection').val();
    let gender = $('#genderSelection').val();
    resetForm();

    let getListOfDoctorsPromise = doctors.getDoctors(medicalIssue, gender);
    getListOfDoctorsPromise.then(function(response) {
      let body = JSON.parse(response);
      buildDoctorCards(body);
    }, function(error) {
      $('.searchForm').toggle();
      $('#searchSubmit').toggle();
      $('.showErrors').append( `${error.message}`);
      returnToForm();
    });
  });
});

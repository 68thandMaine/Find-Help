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
// ----- Doctor promise functions------//

function listOfDoctors(medicalIssue, gender) {
  const doctors = new Doctors();
  let getListOfDoctorsPromise = doctors.getDoctors(medicalIssue, gender);
  getListOfDoctorsPromise.then((response) => {
    // const doctorList = doctors.buildSearchInput(response);
    const body = JSON.parse(response);
    $('.searchForm').toggle();
    $('#searchSubmit').toggle();
    buildDoctorCards(body);
    returnToForm();
  }, function(error) {
    $('.searchForm').toggle();
    $('#searchSubmit').toggle();
    $('.showErrors').append( `${error.message}`);
    returnToForm();
  });
}
// -------/doctor promise -------//

$(document).ready(function() {
  getConditions();


  $('#searchSubmit').click(function() {
    resetDocSpecs();
    let medicalIssue = $('#conditionSelection').val();
    console.log(medicalIssue);
    let gender = $('#genderSelection').val();
    resetForm();
    listOfDoctors(medicalIssue, gender);

  });
});

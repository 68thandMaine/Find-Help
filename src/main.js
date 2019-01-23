import { Doctors } from './doctors.js';
import { KnownConditions } from './conditions.js';
import { buildDoctorCards, onStart, resetDocSpecs, resetForm, returnToForm, goBack } from './ui-logic.js';
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


// ----- Doctor promise functions------//

function listOfDoctors(medicalIssue, gender) {
  let name = $('#textSearchInput').val()
  const doctors = new Doctors();
  let getListOfDoctorsPromise = doctors.getDoctors(medicalIssue, gender);
  getListOfDoctorsPromise.then((response) => {
    const doctorList = doctors.buildSearchInput(response);
    console.log(doctorList);
    const body = JSON.parse(response);
    $('.searchForm').toggle();
    $('#searchSubmit').toggle();
    buildDoctorCards(body);
    returnToForm();
  }, function(error) {
    $('.searchForm').toggle();
    $('#searchSubmit').toggle();
    $('#showErrors').append( `${error.message}`);
    returnToForm();
  });
}

// -------/doctor promise -------//

$(document).ready(function() {
  onStart();
  getConditions();

  $('#searchSubmit').click(function() {
    resetDocSpecs();
    $('#back').toggle();
    let medicalIssue = $('#conditionSelection').val();
    let name = $('#searchByName').val();
    resetForm();
    listOfDoctors(medicalIssue, name);
  });

  goBack()

});

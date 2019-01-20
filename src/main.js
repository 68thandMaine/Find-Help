import { Doctors } from './doctors.js';
import { buildDoctorCards } from './ui-logic.js';
import $ from 'jquery';
import './styles.css';
import 'bootstrap';

function getConditions() {
  const knownConditions = new KnownConditions();
  let conditionsPromise = knownConditions.condtions();

  conditionsPromise.then((response) => {
    knownCondtions.knownConditionsList(response);
    buildConditionOptions(knownCondtions.listOfConditions);
  }),
}

function buildConditionOptions(illnesses) {
  illnesses.forEach((illness) => {
    $('#conditionSelection').append(`<option value="${illness}">${illness}</option>`);
  });
}

$(document).ready(function() {
  getConditions();
  const doctors = new Doctors();




$('.searchForm').submit(function(event) {
  event.preventDefault();
  let medicalIssue = $('#conditionSelection').val();
  $('#conditionSelection').val('');
  let gender = $('#genderSelection').val();
  $('#gender').val('');
if($("#conditionSelection").val() || $("#genderSelection").val() === ' ') {
  return displayError
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

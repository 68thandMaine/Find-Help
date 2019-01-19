import { Doctors } from './doctors.js';
import { buildDoctorCards } from './ui-logic.js';
import $ from 'jquery';
import './styles.css';
import 'bootstrap';

$(document).ready(function() {
  const doctors = new Doctors();




$('.searchForm').submit(function(event) {
  event.preventDefault();
  let medicalIssue = $('#concern').val();
  $('#concern').val('');
  let gender = $('#gender').val();
  $('#gender').val('');

  let getListOfDoctorsPromise = doctors.getDoctors(medicalIssue, gender);
  getListOfDoctorsPromise.then(function(response) {
    let body = JSON.parse(response);
    buildDoctorCards(body);
  }, function(error) {
    $('.showErrors').text(`There was an error processing your requst: ${error.message}`);
});



});
});

import $ from 'jquery';

export function buildDoctorCards(body) {
  let doctorList = "";
  for(let i=0; i < body.data.length; i++) {
    doctorList += `<div class="card-body" value="${body.data[i].uid}"><h5 class="card-title">Dr. ${body.data[i].profile.first_name} ${body.data[i].profile.last_name}</h5><h6 class="card-subtitle mb-2 text-muted">${body.data[i].educations.school}<br>${body.data[i].educations.graduation_year}<br>${body.data[i].educations.degree}</h6><p class="card-text">Dr. ${body.data[i].profile.last_name} practices in ${body.data[i].practices.location_slug}.<br>If you are looking to visit this doctor, their visiting address is:<br>${body.data[i].practices.visit_address.street}<br>${body.data[i].practices.visit_address.city}, ${body.data[i].practices.visit_address.state}. ${body.data[i].practice.visit_address.zip}<p></div>`
  }
  $('#output').append(doctorList);
}

// ------/buildDoctorCards--------//

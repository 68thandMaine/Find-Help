import $ from 'jquery';

export function error() {

}



export function buildDoctorCards(body) {
  let doctorList = "";
  for(let i = 0; i < body.data.length; i++) {
    doctorList += `<div class="card-body" value="${body.data[i].uid}"><h5 >Dr. ${body.data[i].profile.first_name} ${body.data[i].profile.last_name}</h5><p class="card-text">Dr. ${body.data[i].profile.last_name} practices in ${body.data[i].practices[0].location_slug}.<br>If you are looking to visit this doctor, their visiting address is:<br>${body.data[i].practices[0].visit_address.street}<br>${body.data[i].practices[0].visit_address.city}, ${body.data[i].practices[0].visit_address.state}. ${body.data[i].practices[0].visit_address.zip}</p>
    <p>You can call Dr. ${body.data[i].profile.last_name} at: ${body.data[i].practices[0].phones[0].number}.</p>
    <p>At this time Dr. ${body.data[i].profile.last_name} is accepting patients: ${body.data[i].practices[0].accepts_new_patients}.</p><br><p>Visit Dr. ${body.data[i].profile.last_name}'s website at ${body.data[i].practices[0].website}'
    </div>`;

  }
  $('#output').append(doctorList);
}

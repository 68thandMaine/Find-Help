import $ from 'jquery';


// export function autocompleteField(name, arr) {
//   let b, i, val = this.name;
//   if(!name)
// }

export function resetForm(){
  $('#conditionSelection').val('');
  $('#genderSelection').val('');
}

export function returnToForm(){
  $("#showErrors").on("click", "button", function(){
    $('#showErrors').empty();
    $('.searchForm').show();
    $('#searchSubmit').show();
  });
}

export function resetDocSpecs() {
  $("#doctorInfo").toggle();
  $("#doctorInfo").empty();
}

export function onStart() {
  $("#doctorInfo").hide();
  $("#searchMenu").hide();
}

export function buildDoctorCards(body) {
  if(body.data.length <= 0) {
    let noMatchCard = ""
    noMatchCard += `<div class="card" id="noResultsMatch">
    <div class="card-body">
    <h5 class="card-title">Uh Oh!</h5>
    <h6 class="card-subtitle mb-2 text-muted">We weren't able to find a match.</h6>
    <p class="card-text">Please try again.</p>
    <button type="button" class="btn btn-secondary" id="backToSearch">Back to Search</button>
    </div>
    </div>`
    $("#showErrors").append(noMatchCard);
  }
  else if (body.data.length > 0) {
    let doctorCards = "";
    for(let i = 0; i < body.data.length; i++) {
      doctorCards += `<div class="card-body" value="${body.data[i].uid}" id="doctorCard"><h5 class="card-title" id="drName" >Dr. ${body.data[i].profile.first_name} ${body.data[i].profile.last_name}</h5><p class="card-text">Dr. ${body.data[i].profile.last_name} practices in ${body.data[i].practices[0].location_slug}.<br>If you are looking to visit this doctor, their visiting address is:<br>${body.data[i].practices[0].visit_address.street}<br>${body.data[i].practices[0].visit_address.city}, ${body.data[i].practices[0].visit_address.state}. ${body.data[i].practices[0].visit_address.zip}</p>
      <p>You can call Dr. ${body.data[i].profile.last_name} at: ${body.data[i].practices[0].phones[0].number}.</p>
      <p>At this time Dr. ${body.data[i].profile.last_name} is accepting patients: ${body.data[i].practices[0].accepts_new_patients}.</p><br><p>Visit Dr. ${body.data[i].profile.last_name}'s website at ${body.data[i].practices[0].website}'
      </div>`;
    }
    $('#doctorInfo').append(doctorCards);
  }
}

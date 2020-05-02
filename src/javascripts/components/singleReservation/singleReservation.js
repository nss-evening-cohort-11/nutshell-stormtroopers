import utils from '../../helpers/utils';

const serversDropdown = () => {
  let domString = '';
  domString += '    <button class="btn btn-outline-dark dropdown-toggle" id="serversDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Assign New Server</button>';
  // domString += '    <div class="dropdown-menu" aria-labelledby="serversDropdown">';
  // jobs.forEach((job) => {
  //   domString += `      <button id="${job.id}" class="job-button btn-outline-dark dropdown-item" type="button">${job.jobType}</button>`;
  // });
  return domString;
};

const serverAssistantsDropdown = () => {
  let domString = '';
  domString += '    <button class="btn btn-outline-dark dropdown-toggle" id="serversAssistantsDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Assign New Server Assistant</button>';
  // domString += '    <div class="dropdown-menu" aria-labelledby="serversDropdown">';
  // jobs.forEach((job) => {
  //   domString += `      <button id="${job.id}" class="job-button btn-outline-dark dropdown-item" type="button">${job.jobType}</button>`;
  // });
  return domString;
};

const tablesDropdown = () => {
  let domString = '';
  domString += '    <button class="btn btn-outline-dark dropdown-toggle" id="tablesDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Assign New Table</button>';
  // domString += '    <div class="dropdown-menu" aria-labelledby="serversDropdown">';
  // jobs.forEach((job) => {
  //   domString += `      <button id="${job.id}" class="job-button btn-outline-dark dropdown-item" type="button">${job.jobType}</button>`;
  // });
  return domString;
};

const showSingleReservation = (reservationId) => {
  let domString = '';
  domString += `<div class="card col-8 offset-2 my-4 single-reservation-table" data-reservation-id="${reservationId}">`;
  domString += '<div class="card-header text-center">';
  domString += '<h2><strong>Reservation Details</strong></h2>';
  domString += '</div>';
  domString += '<div class="card-cody">';
  domString += '<div class="row text-center my-3">';
  domString += '<div class="col-md-4">Party Name:</div>';
  domString += '<div class="col-md-4">Reservation Time Slot & Date:</div>';
  domString += '<div class="col-md-4">Party Size:</div>';
  domString += '</div>';
  domString += '<div class="row text-center my-3">';
  domString += '<div class="col-md-4 dropdown">';
  domString += serversDropdown();
  domString += '</div>';
  domString += '<div class="col-md-4 dropdown">';
  domString += serverAssistantsDropdown();
  domString += '</div>';
  domString += '<div class="col-md-4 dropdown">';
  domString += tablesDropdown();
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  domString += '<div class="text-center py-2">';
  domString += '<button class="btn btn-success mx-1 exit-single-res-btn">View All Reservations</button>';
  domString += '<button class="btn btn-danger mx-1 reject-res-btn">Reject Reservation</button>';
  domString += '<button class="btn btn-primary mx-1 update-res-btn">Update Reservation</button>';
  domString += '</div>';
  domString += '</div>';
  utils.printToDom('single-reservation-container', domString);
};

export default { showSingleReservation };

import utils from '../../helpers/utils';

const showSingleReservation = (reservationId) => {
  let domString = '';
  domString += `<div class="card col-8 offset-2 my-4 single-reservations-table" id="${reservationId}-details">`;
  domString += '<div class="card-header text-center">';
  domString += '<h2><strong>Reservation Details</strong></h2>';
  domString += '</div>';
  domString += '<p>Res Details</p>';
  domString += '<div class="text-center py-2">';
  domString += '<button class="btn btn-success mx-1 exit-single-res-btn">View All Reservations</button>';
  domString += '<button class="btn btn-danger mx-1 reject-res-btn">Reject Reservation</button>';
  domString += '<button class="btn btn-primary mx-1 update-res-btn">Update Reservation</button>';
  domString += '</div>';
  domString += '</div>';
  utils.printToDom('single-reservation-container', domString);
};

export default { showSingleReservation };

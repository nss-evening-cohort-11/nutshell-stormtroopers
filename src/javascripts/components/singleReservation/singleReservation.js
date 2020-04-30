import utils from '../../helpers/utils';

const showSingleReservation = (e) => {
  const reservationId = e.target.closest('li').id;
  $('#single-reservation-container').removeClass('hide');
  $('#filtered-reservations-container').addClass('hide');
  let domString = '';
  domString += `<div class="card col-8 offset-2 my-4 single-reservations-table" id="${reservationId}-details">`;
  domString += '<div class="card-header text-center">';
  domString += '<h2><strong>Reservation Details</strong></h2>';
  domString += '</div>';
  domString += '<p>Res Details</p>';
  domString += '</div>';
  utils.printToDom('single-reservation-container', domString);
};

export default { showSingleReservation };

import utils from '../../helpers/utils';
import './reservationsPortal.scss';
import smashData from '../../helpers/data/smashData';
// import timeSlotData from '../../helpers/data/timeSlotData';

const buildReservationsTable = (reservations) => {
  let domString = '';
  reservations.forEach((res) => {
    domString += '<div>';
    domString += `<p>${res.partyName} & ${res.timeslot} & ${res.date}</p>`;
    domString += '</div>';
  });
  utils.printToDom('filtered-reservations-container', domString);
};

const showReservationsByDate = () => {
  const selectedDate = '2020-04-22';
  smashData.getReservationTimeslotsByDate(selectedDate)
    .then((reservations) => {
      console.error('today', reservations);
      console.error('today', reservations[0]);
      buildReservationsTable(reservations);
    })
    .catch((err) => console.error('could not get reservations by date', err));
};

const buildReservationsPortalSection = () => {
  let domString = '<h1 id="reservations-portal-header" class="reservations-portal-title text-center">Reservations Portal</h1>';
  domString += '<div class="col-12 text-center"><input type="date" id="reservation-date-selector" class="mx-1" value="2020-04-21"><button type="submit" id="filter-date-btn" class="btn btn-secondary mx-1">Select Date</button></div>';
  domString += '<div id="filtered-reservations-container"></div>';
  utils.printToDom('reservations-portal-section', domString);
  showReservationsByDate();
  $(document).ready(() => {
    $('#home-page').addClass('hide');
    $('#staff-section-container').addClass('hide');
    $('#reservations-section').addClass('hide');
    $('#menu-section').addClass('hide');
    $('#ingredients-section').addClass('hide');
    $('#reservations-portal-section').removeClass('hide');
  });
};

export default { buildReservationsPortalSection };

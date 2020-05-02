import utils from '../../helpers/utils';
import smashData from '../../helpers/data/smashData';
import singleReservation from '../singleReservation/singleReservation';
import reservationData from '../../helpers/data/reservationData';
import './reservationsPortal.scss';
import 'moment';

const Moment = require('moment');

// filters the page off the selected date
const showFilteredReservations = () => {
  const selectedDate = $('#date-selector').val();
  smashData.getReservationTimeslotsByDate(selectedDate)
    .then((reservations) => {
      // eslint-disable-next-line no-use-before-define
      buildReservationsTable(reservations);
      $('#single-reservation-container').addClass('hide');
      $('#filtered-reservations-container').removeClass('hide');
    })
    .catch((err) => console.error('could not get reservations by date', err));
};

// clicking on an individual reservation prints a new div with a single reservation view
const showSingleReservationEvent = (e) => {
  const reservationId = e.target.closest('li').id;
  $('#single-reservation-container').removeClass('hide');
  $('#filtered-reservations-container').addClass('hide');
  singleReservation.showSingleReservation(reservationId);
};

// click event that deletes the selected reservation
const rejectSingleReservationEvent = (e) => {
  const singleResCard = e.target.closest('.card');
  const reservationId = $(singleResCard).data('reservationId');
  reservationData.deleteReservation(reservationId)
    .then(() => showFilteredReservations())
    .catch((err) => console.error('could not delete reservation', err));
};

// click event that updates selected reservation
const updateSingleReservationEvent = (e) => {
  e.preventDefault();
  const singleResCard = e.target.closest('.card');
  const reservationId = $(singleResCard).data('reservationId');
  reservationData.getSingleReservation(reservationId)
    .then((resp) => {
      const res = resp.data;
      const server = $('#serversDropdown :selected').val();
      const serverAsst = $('#serversAssistantsDropdown :selected').val();
      const selectedTableId = $('#tablesDropdown :selected').val();
      const modifiedResObject = {
        billTotal: '',
        date: res.date,
        fullyStaffed: res.fullyStaffed,
        hasServer: res.hasServer,
        hasServerAssistant: res.hasServerAssistant,
        numOfGuests: res.numOfGuests,
        partyName: res.partyName,
        tableId: res.tableId,
        timeSlotId: res.timeSlotId,
      };
      if (server !== 'default-server-dropdown') {
        modifiedResObject.hasServer = true;
      }
      if (serverAsst !== 'default-assistant-dropdown') {
        modifiedResObject.hasServerAssistant = true;
      }
      if (modifiedResObject.hasServer && modifiedResObject.hasServerAssistant) {
        modifiedResObject.fullyStaffed = true;
      }
      if (selectedTableId !== 'default-table-dropdown') {
        modifiedResObject.tableId = selectedTableId;
      }
      reservationData.editEntireReservation(reservationId, modifiedResObject)
        .then(() => showFilteredReservations());
    })
    .catch((err) => console.error('could not get reservation', err));
};

// Events loaded with Auth
const removeReservationPortalEvents = () => {
  $('body').off('click', '#filter-date-btn', showFilteredReservations);
  $('body').off('click', '.single-reservation-btn', showSingleReservationEvent);
  $('body').off('click', '.exit-single-res-btn', showFilteredReservations);
  $('body').off('click', '.reject-res-btn', rejectSingleReservationEvent);
  $('body').off('click', '.update-res-btn', updateSingleReservationEvent);
};

const reservationPortalEvents = () => {
  $('body').on('click', '#filter-date-btn', showFilteredReservations);
  $('body').on('click', '.single-reservation-btn', showSingleReservationEvent);
  $('body').on('click', '.exit-single-res-btn', showFilteredReservations);
  $('body').on('click', '.reject-res-btn', rejectSingleReservationEvent);
  $('body').on('click', '.update-res-btn', updateSingleReservationEvent);
};

// Table builder function
const buildReservationsTable = (reservations) => {
  let domString = '';
  domString += '<div class="card col-10 offset-1 my-4 filtered-reservations-table">';
  domString += '<div class="card-header text-center">';
  domString += '<h2><strong>Reservations</strong></h2>';
  domString += `<h4>Total Reservations: ${reservations.length}</h4>`;
  domString += '</div>';
  reservations.forEach((res) => {
    domString += '<ul class="list-group list-group-flush">';
    domString += `<li class="list-group-item" id="${res.id}">`;
    domString += '<div class="row text-center align-items-center">';
    domString += `<div class="col-md-2">${res.partyName}</div>`;
    domString += `<div class="col-md-1">${res.timeslot}</div>`;
    domString += `<div class="col-md-2">${new Moment(res.date).format('MMMM Do')}</div>`;
    domString += `${res.fullyStaffed ? '<div class="col-md-2 text-success">Staff Assigned</div>' : '<div class="col-md-2 text-danger">Needs Staff Assigned</div>'}`;
    domString += '<button class="btn btn-outline-dark col-md-2 mx-auto single-reservation-btn">View Reservation</button>';
    domString += '<button class="btn btn-outline-dark col-md-2 mx-auto edit-order-btn">Edit Order</button>';
    domString += '</div>';
    domString += '</li>';
    domString += '</ul>';
  });
  domString += '</div>';
  utils.printToDom('filtered-reservations-container', domString);
};

// Axios call to retrieve selected date's reservations
const showReservationsByDate = () => {
  const selectedDate = '2020-04-21';
  smashData.getReservationTimeslotsByDate(selectedDate)
    .then((reservations) => {
      buildReservationsTable(reservations);
    })
    .catch((err) => console.error('could not get reservations by date', err));
};

// function to show reservations portal page and print header and div containers
const buildReservationsPortalSection = () => {
  let domString = '<h1 id="reservations-portal-header" class="reservations-portal-title text-center">Reservations Portal</h1>';
  domString += '<div class="col-12 text-center"><input type="date" id="date-selector" class="mx-1" value="2020-04-21"><button type="submit" id="filter-date-btn" class="btn btn-secondary mx-1">Select Date</button></div>';
  domString += '<div id="single-reservation-container" class="hide"></div>';
  domString += '<div id="filtered-reservations-container"></div>';
  utils.printToDom('reservations-portal-section', domString);
  showReservationsByDate();
  $(document).ready(() => {
    $('#home-page').addClass('hide');
    $('#staff-section-container').addClass('hide');
    $('#reservations-section').addClass('hide');
    $('#menu-section').addClass('hide');
    $('#ingredients-section').addClass('hide');
    $('#reporting-section').addClass('hide');
    $('#reservations-portal-section').removeClass('hide');
  });
};

export default { buildReservationsPortalSection, reservationPortalEvents, removeReservationPortalEvents };

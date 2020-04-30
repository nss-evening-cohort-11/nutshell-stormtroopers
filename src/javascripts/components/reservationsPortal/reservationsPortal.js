import utils from '../../helpers/utils';
import smashData from '../../helpers/data/smashData';
import singleReservation from '../singleReservation/singleReservation';
import './reservationsPortal.scss';
import 'moment';

const Moment = require('moment');

const showFilteredReservations = () => {
  const selectedDate = $('#date-selector').val();
  smashData.getReservationTimeslotsByDate(selectedDate)
    .then((reservations) => {
      // eslint-disable-next-line no-use-before-define
      buildReservationsTable(reservations);
    })
    .catch((err) => console.error('could not get reservations by date', err));
};

const removeReservationPortalEvents = () => {
  $('body').off('click', '#filter-date-btn', showFilteredReservations);
  $('body').off('click', '.single-reservation-btn', singleReservation.showSingleReservation);
};

const reservationPortalEvents = () => {
  $('body').on('click', '#filter-date-btn', showFilteredReservations);
  $('body').on('click', '.single-reservation-btn', singleReservation.showSingleReservation);
};

// Table builder function
const buildReservationsTable = (reservations) => {
  let domString = '';
  domString += '<div class="card col-8 offset-2 my-4 filtered-reservations-table">';
  domString += '<div class="card-header text-center">';
  domString += '<h2><strong>Reservations</strong></h2>';
  domString += `<h4>Total Reservations: ${reservations.length}</h4>`;
  domString += '</div>';
  reservations.forEach((res) => {
    domString += '<ul class="list-group list-group-flush">';
    domString += `<li class="list-group-item" id="${res.id}">`;
    domString += '<div class="row align-items-center">';
    domString += `<div class="col-md-3">${res.partyName}</div>`;
    domString += `<div class="col-md-2">${res.timeslot}</div>`;
    domString += `<div class="col-md-2">${new Moment(res.date).format('MMMM Do YYYY')}</div>`;
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

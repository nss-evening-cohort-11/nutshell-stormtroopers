import utils from '../../helpers/utils';
import tableData from '../../helpers/data/tableData';
import timeSlotsComponent from '../timeSlots/timeSlots';
import smashData from '../../helpers/data/smashData';
import newReservationForm from '../newReservationForm/newReservationForm';
import reservationData from '../../helpers/data/reservationData';
import editReservationForm from '../editReservationForm/editReservationForm';

// deleting reservation
const deleteReservationEvent = (e) => {
  const selectedDate = $('#reservation-date-selector').val();
  const reservationId = e.target.closest('.delete-reservation-button').id;
  reservationData.deleteReservation(reservationId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      smashData.getTablesWithReservations(selectedDate)
        .then((tables) => {
          // eslint-disable-next-line no-use-before-define
          buildTableCard(tables);
        })
        .catch((err) => console.error('could not get tables', err));
    })
    .catch((err) => console.error('could not delete reservation', err));
};

// editing reservation
const editExistingReservation = (e) => {
  e.preventDefault();
  const selectedDate = $('#reservation-date-selector').val();
  const editedReservationId = e.target.dataset.reservationId;
  const newNumOfGuests = $('#edit-number-of-guests').val() * 1;
  const newPartyName = $('#edit-party-name').val();
  reservationData.editReservation(editedReservationId, newNumOfGuests, newPartyName).then(() => {
    $('#edit-reservation-modal').modal('hide');
    // eslint-disable-next-line no-use-before-define
    smashData.getTablesWithReservations(selectedDate)
      .then((tables) => {
        // eslint-disable-next-line no-use-before-define
        buildTableCard(tables);
      })
      .catch((err) => console.error('could not get tables', err));
  });
};

// making new reservation
const makeNewReservation = (e) => {
  e.preventDefault();
  const selectedDate = $('#reservation-date-selector').val();
  const newReservation = {
    timeSlotId: e.target.dataset.timeSlotId,
    tableId: e.target.dataset.tableId,
    numOfGuests: $('#new-number-of-guests').val() * 1,
    partyName: $('#new-party-name').val(),
    fullyStaffed: false,
    hasServer: false,
    hasServerAssistant: false,
    billTotal: '',
    date: selectedDate,
  };
  reservationData.addReservation(newReservation).then(() => {
    $('#reservation-modal').modal('hide');
    // eslint-disable-next-line no-use-before-define
    smashData.getTablesWithReservations(selectedDate)
      .then((tables) => {
        // eslint-disable-next-line no-use-before-define
        buildTableCard(tables);
      })
      .catch((err) => console.error('could not get tables', err));
  });
};

// make new reservation modal
const openNewReservationModal = (e) => {
  $('#reservation-modal').modal('show');
  $('#close-resevation-modal').click(() => {
    $('#reservation-modal').modal('hide');
  });
  const tableId = e.target.closest('.card').id;
  const timeSlotId = e.target.closest('.list-group-item').id;
  tableData.getTables().then((tables) => {
    const selectedTable = tables.find((currentTable) => tableId === currentTable.id);
    let domString = '';
    // new reservation modal form
    domString += newReservationForm.makeNewReservationForm(selectedTable, timeSlotId);
    utils.printToDom('single-view', domString);
  });
};

// edit existing reservation
const openExistingReservationEditModal = (e) => {
  $('#edit-reservation-modal').modal('show');
  $('#close-edit-resevation-modal').click(() => {
    $('#edit-reservation-modal').modal('hide');
  });
  const reservationId = e.target.id;
  reservationData.getReservations()
    .then((reservations) => {
      const selectedReservation = reservations.find((currentReservation) => reservationId === currentReservation.id);
      let domString = '';
      // form for edit modal
      domString += editReservationForm.showEditReservationForm(selectedReservation);
      utils.printToDom('edit-single-view', domString);
    });
};

// click event that reprints the page with the selected date
const filterReservationsByDate = () => {
  const selectedDate = $('#reservation-date-selector').val();
  smashData.getTablesWithReservations(selectedDate)
    .then((tables) => {
      // eslint-disable-next-line no-use-before-define
      buildTableCard(tables);
    })
    .catch((err) => console.error('could not get tables', err));
};

const removeReservationSectionEvents = () => {
  $('body').off('click', '.edit-reservation-button', openExistingReservationEditModal);
  $('body').off('click', '.delete-reservation-button', deleteReservationEvent);
  $('body').off('click', '.individual-time-slot', openNewReservationModal);
  $('body').off('click', '#new-reservation-button', makeNewReservation);
  $('body').off('click', '#edit-reservation-button', editExistingReservation);
  $('body').off('click', '#filter-date-btn', filterReservationsByDate);
};

const reservationSectionEvents = () => {
  $('body').on('click', '.edit-reservation-button', openExistingReservationEditModal);
  $('body').on('click', '.delete-reservation-button', deleteReservationEvent);
  $('body').on('click', '.individual-time-slot', openNewReservationModal);
  $('body').on('click', '#new-reservation-button', makeNewReservation);
  $('body').on('click', '#edit-reservation-button', editExistingReservation);
  $('body').on('click', '#filter-date-btn', filterReservationsByDate);
};

// function that displays all tables with timeslots and reservations
const buildTableCard = (tables) => {
  let domString = '';
  domString += '<div class="d-flex flex-wrap justify-content-around" id="table-container">';
  tables.forEach((table) => {
    domString += `<div class="card col-3 d-flex individual-table" id="${table.id}">`;
    domString += '<div class="card-header text-center">';
    domString += `<h2><strong>${table.tableNumber}</strong></h2>`;
    domString += `<h4>Available Seats: ${table.numOfSeats}</h4>`;
    domString += '</div>';
    domString += '<ul class="list-group list-group-flush">';
    domString += timeSlotsComponent.buildTimeSlots(table.timeSlots);
    domString += '</ul>';
    domString += '</div>';
  });
  domString += '</div>';
  utils.printToDom('table-reservations-container', domString);
};

// function that gets all reservations by selected date and calls the table builder function to display tables
const showReservationsByTable = () => {
  const selectedDate = '2020-04-21';
  smashData.getTablesWithReservations(selectedDate)
    .then((tables) => {
      buildTableCard(tables);
    })
    .catch((err) => console.error('could not get tables', err));
};

// function that builds the reservation page with the page header and date dropdown
const buildReservationsSection = () => {
  let domString = '<strong><h1 class="reservations-title">Reservations</h1></strong>';
  domString += '<div class="col-12 text-center"><input type="date" id="reservation-date-selector" class="mx-1" value="2020-04-21"><button type="submit" id="filter-date-btn" class="btn btn-secondary mx-1">Select Date</button></div>';
  domString += '<div id="table-reservations-container"></div>';
  utils.printToDom('reservations-section', domString);
  showReservationsByTable();
  $(document).ready(() => {
    $('#home-page').addClass('hide');
    $('#staff-section-container').addClass('hide');
    $('#reservations-section').removeClass('hide');
    $('#menu-section').addClass('hide');
    $('#ingredients-section').addClass('hide');
    $('#reporting-section').addClass('hide');
  });
};

export default {
  buildReservationsSection,
  makeNewReservation,
  reservationSectionEvents,
  removeReservationSectionEvents,
};

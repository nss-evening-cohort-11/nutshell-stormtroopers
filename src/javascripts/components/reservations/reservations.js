import utils from '../../helpers/utils';
import tableData from '../../helpers/data/tableData';
// import timeSlotData from '../../helpers/data/timeSlotData';
import timeSlotsComponent from '../timeSlots/timeSlots';
// import timeSlotData from '../../helpers/data/timeSlotData';
import smashData from '../../helpers/data/smashData';
import newReservationForm from '../newReservationForm/newReservationForm';
import reservationData from '../../helpers/data/reservationData';
import editReservationForm from '../editReservationForm/editReservationForm';
// import timeSlots from '../timeSlots/timeSlots';

const deleteReservationEvent = (e) => {
  console.log(e.target.id);
  const reservationId = e.target.id;
  reservationData.deleteReservation(reservationId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildReservationsSection();
    })
    .catch((err) => console.error('could not delete reservation', err));
};

const editExistingReservation = (e) => {
  e.preventDefault();
  const editedReservationId = e.target.dataset.reservationId;
  const editedReservation = {
    timeSlotId: e.target.dataset.timeSlotId,
    tableId: e.target.dataset.tableId,
    numOfGuests: $('#edit-number-of-guests').val() * 1,
    partyName: $('#edit-party-name').val(),
  };
  reservationData.editReservation(editedReservationId, editedReservation).then(() => {
    $('#edit-reservation-modal').modal('hide');
    // eslint-disable-next-line no-use-before-define
    buildReservationsSection();
  });
};

const makeNewReservation = (e) => {
  e.preventDefault();
  const newReservation = {
    timeSlotId: e.target.dataset.timeSlotId,
    tableId: e.target.dataset.tableId,
    numOfGuests: $('#new-number-of-guests').val() * 1,
    partyName: $('#new-party-name').val(),
  };
  reservationData.addReservation(newReservation).then(() => {
    $('#reservation-modal').modal('hide');
    // eslint-disable-next-line no-use-before-define
    buildReservationsSection();
  });
};

const openNewReservationModal = (e) => {
  $('#reservation-modal').modal('show');
  $('#close-resevation-modal').click(() => { $('#reservation-modal').modal('hide'); });
  const tableId = e.target.closest('.card').id;
  const timeSlotId = e.target.closest('.list-group-item').id;
  tableData.getTables().then((tables) => {
    const selectedTable = tables.find((currentTable) => tableId === currentTable.id);
    let domString = '';
    domString += newReservationForm.makeNewReservationForm(selectedTable, timeSlotId);
    utils.printToDom('single-view', domString);
  });
  $('body').on('click', '#new-reservation-button', makeNewReservation);
};

const openExistingReservationEditModal = (e) => {
  $('#edit-reservation-modal').modal('show');
  $('#close-edit-resevation-modal').click(() => { $('#edit-reservation-modal').modal('hide'); });
  const reservationId = e.target.id;
  // const tableId = e.target.closest('.card').id;
  // const timeSlotId = e.target.closest('.list-group-item').id;
  reservationData.getReservations()
    .then((reservations) => {
      const selectedReservation = reservations.find((currentReservation) => reservationId === currentReservation.id);
      console.log(selectedReservation);
      let domString = '';
      domString += editReservationForm.showEditReservationForm(selectedReservation);
      utils.printToDom('edit-single-view', domString);
    });
  $('body').on('click', '#edit-reservation-button', editExistingReservation);
};

const buildReservationsSection = () => {
  let domString = '<h2>Reservations</h2>';
  smashData.getTablesWithReservations()
    .then((tables) => {
      domString += '<div class="d-flex flex-wrap justify-content-center id="table-container">';
      tables.forEach((table) => {
        domString += `<div class="card col-3" id="${table.id}">`;
        domString += '<div class="card-header">';
        domString += `${table.tableNumber}`;
        domString += '</div>';
        domString += `Available Seats: ${table.numOfSeats}`;
        domString += '<ul class="list-group list-group-flush">';
        domString += timeSlotsComponent.buildTimeSlots(table.timeSlots);
        domString += '</ul>';
        domString += '</div>';
      });
      domString += '</div>';
      utils.printToDom('reservations-section', domString);
      $('.edit-reservation-button').click(openExistingReservationEditModal);
      $('.delete-reservation-button').click(deleteReservationEvent);
      $('.individual-time-slot').click(openNewReservationModal);
      $('#home-page').addClass('hide');
      $('#staff-section').addClass('hide');
      $('#reservations-section').removeClass('hide');
      $('#menu-section').addClass('hide');
      $('#ingredients-section').addClass('hide');
    });
// .catch((err) => console.error('could not get tables', err));
};

export default { buildReservationsSection, makeNewReservation };

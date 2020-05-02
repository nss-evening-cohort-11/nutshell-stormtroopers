import utils from '../../helpers/utils';
import smashData from '../../helpers/data/smashData';
import staffData from '../../helpers/data/staffData';
import tableData from '../../helpers/data/tableData';
import 'moment';

const Moment = require('moment');

const notEnoughSeatsAlert = () => {
  let domString = '';

  domString += '<div class="alert bg-danger alert-dismissible fade show" role="alert">';
  domString += '<strong>Party Size too large for currently assigned table!</strong>';
  domString += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
  domString += '  <span aria-hidden="true">&times</span>';
  domString += '</button>';
  domString += '</div>';

  utils.printToDom('table-reassignment-alert', domString);
};

const serversDropdown = () => {
  const jobId = 'job1';
  staffData.getStaffByJobId(jobId)
    .then((servers) => {
      let domString = '';
      domString += '<select class="custom-select" id="serversDropdown">';
      domString += '<option selected>Assign New Server</option>';
      servers.forEach((server) => {
        domString += `<option class="dropdown-item" value="${server.name}">${server.name}</option>`;
      });
      domString += '</select>';
      utils.printToDom('server-assignment-container', domString);
    })
    .catch((err) => console.error('could not get staff', err));
};

const serverAssistantsDropdown = () => {
  const jobId = 'job6';
  staffData.getStaffByJobId(jobId)
    .then((servers) => {
      let domString = '';
      domString += '<select class="custom-select" id="serversAssistantsDropdown">';
      domString += '<option selected>Assign New Server Assistant</option>';
      servers.forEach((server) => {
        domString += `<option class="dropdown-item" value="${server.name}">${server.name}</option>`;
      });
      domString += '</select>';
      utils.printToDom('server-asst-assignment-container', domString);
    })
    .catch((err) => console.error('could not get staff', err));
};

const tablesDropdown = (res) => {
  tableData.getTables()
    .then((tables) => {
      const currentTableId = tables.find((x) => x.id === res.tableId);
      const currentTableNum = currentTableId.tableNumber;
      let domString = '';
      domString += '<select class="custom-select" id="tablesDropdown">';
      domString += `<option selected>Current Table: ${currentTableNum}</option>`;
      const filteredTables = tables.filter((x) => x.numOfSeats >= res.numOfGuests);
      filteredTables.forEach((table) => {
        domString += `<option class="dropdown-item" value="${table.tableNumber}">${table.tableNumber}</option>`;
      });
      domString += '</select>';
      if (currentTableId.numOfSeats < res.numOfGuests) {
        notEnoughSeatsAlert();
      }
      utils.printToDom('tables-assignment-container', domString);
    })
    .catch((err) => console.error('could not get staff', err));
};

const showSingleReservation = (reservationId) => {
  smashData.getSingleReservationWithTimeslot(reservationId)
    .then((res) => {
      // const { tableId } = res.tableId;
      // console.error('wat', tableId);
      let domString = '';
      domString += `<div class="card col-8 offset-2 my-4 single-reservation-table" data-reservation-id="${reservationId}">`;
      domString += '<div class="card-header text-center">';
      domString += '<h2><strong>Reservation Details</strong></h2>';
      domString += '</div>';
      domString += '<div class="card-body">';
      domString += '<div class="row text-center my-3">';
      domString += `<div class="col-md-4">Party Name: ${res.partyName}</div>`;
      domString += `<div class="col-md-4">Reservation Time Slot & Date: ${res.timeslot} ${new Moment(res.date).format('MMMM Do')}</div>`;
      domString += `<div class="col-md-4">Party Size: ${res.numOfGuests}</div>`;
      domString += '</div>';
      domString += '<div class="row text-center my-3">';
      domString += '<div id="server-assignment-container" class="col-md-4 input-group">';
      domString += serversDropdown();
      domString += '</div>';
      domString += '<div id="server-asst-assignment-container" class="col-md-4 dropdown">';
      domString += serverAssistantsDropdown();
      domString += '</div>';
      domString += '<div id="tables-assignment-container" class="col-md-4 dropdown">';
      domString += tablesDropdown(res);
      domString += '</div>';
      domString += '</div>';
      domString += '</div>';
      domString += '<div id="table-reassignment-alert"></div>';
      domString += '<div class="text-center py-2">';
      domString += '<button class="btn btn-success mx-1 exit-single-res-btn">View All Reservations</button>';
      domString += '<button class="btn btn-danger mx-1 reject-res-btn">Reject Reservation</button>';
      domString += '<button class="btn btn-primary mx-1 update-res-btn">Update Reservation</button>';
      domString += '</div>';
      domString += '</div>';
      utils.printToDom('single-reservation-container', domString);
    })
    .catch((err) => console.error('could not get reservation', err));
};

export default { showSingleReservation };

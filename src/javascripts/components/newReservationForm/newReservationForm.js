const makeNewReservationForm = (selectedTable, timeSlotId) => {
  let domString = '';
  domString += `<h2>${selectedTable.tableNumber}</h2>`;
  domString += '<form>';
  domString += '<div class="form-group">';
  domString += '<label for="Number of Guests">Number of Guests</label>';
  domString += '<input type="number" class="form-control" id="new-number-of-guests" placeholder="Number of Guests">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="Party Name">Party Name</label>';
  domString += '<input type="text" class="form-control" id="new-party-name" placeholder="Party Name">';
  domString += '</div>';
  domString += `<button type="button" id="new-reservation-button" data-table-id="${selectedTable.id}" data-time-slot-id="${timeSlotId}" class="btn btn-primary">Create New Reservation</button>`;
  domString += '</form>';
  return domString;
};

export default { makeNewReservationForm };

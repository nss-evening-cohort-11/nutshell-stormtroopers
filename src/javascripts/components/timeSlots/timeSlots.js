const buildTimeSlots = (timeSlots) => {
  let domString = '';
  timeSlots.forEach((timeSlot) => {
    if (timeSlot.reservations[0] !== undefined) {
      // time reserved
      timeSlot.reservations.forEach((reservation) => {
        domString += `<li class="list-group-item" id="${timeSlot.id}">`;
        domString += `<p class="individual-time-slot">(Reserved) ${timeSlot.time}</p>`;
        domString += `<p>Party Name: ${reservation.partyName}</p>`;
        domString += `<p>Number of Guests: ${reservation.numOfGuests}</p>`;
        domString += `<button class="btn btn-danger delete-reservation-button" id="${reservation.id}"><i class="fas fa-trash"></i></button>`;
        domString += '</li>';
      });
    } else {
      // time not reserved
      domString += `<li class="list-group-item individual-time-slot" id="${timeSlot.id}">`;
      domString += `<p class="individual-time-slot">${timeSlot.time}</p>`;
      domString += '</li>';
    }
  });
  return domString;
};

export default { buildTimeSlots };

const buildTimeSlots = (timeSlots) => {
  let domString = '';
  timeSlots.forEach((timeSlot) => {
    if (timeSlot.reservations[0] !== undefined) {
      // time reserved
      timeSlot.reservations.forEach((reservation) => {
        domString += `<li class="list-group-item" id="${timeSlot.id}">`;
        domString += `<div class="reserved-timeslot"><span class="individual-time-slot"<strong>(Reserved Time)</strong> ${timeSlot.time}</span>`;
        domString += `<button class="btn btn-danger delete-reservation-button" id="${reservation.id}"><i class="fas fa-trash"></i></button>`;
        domString += `<button class="btn btn-danger edit-reservation-button" id="${reservation.id}"><i class="fas fa-user-edit"></i></button>`;
        domString += '</div>';
        domString += '</li>';
      });
    } else {
      // time not reserved
      domString += `<li class="list-group-item individual-time-slot" id="${timeSlot.id}">`;
      domString += `<p class="individual-time-slot"><strong>(Open Time)</strong> ${timeSlot.time}</p>`;
      domString += '</li>';
    }
  });
  return domString;
};

export default { buildTimeSlots };

const buildTimeSlots = (timeSlots) => {
  let domString = '';
  timeSlots.forEach((timeSlot) => {
    if (timeSlot.reservations[0] !== undefined) {
      // time reserved
      timeSlot.reservations.forEach((reservation) => {
        domString += `<li class="list-group-item" id="${timeSlot.id}">`;
        domString += `<div class="d-flex justify-content-between"><span class="reserved-timeslot"><strong>(Reserved Time)</strong> ${timeSlot.time}</span>`;
        domString += `<button class="edit-reservation-button" id="${reservation.id}">${reservation.partyName}</button>`;
        domString += `<button class="delete-reservation-button" id="${reservation.id}"><i class="far fa-times-circle"></i></button>`;
        domString += '</div>';
        domString += '</li>';
      });
    } else {
      // time not reserved
      domString += `<li class="list-group-item individual-time-slot text-center" id="${timeSlot.id}">`;
      domString += `<p class="individual-time-slot"><strong>(Open Time)</strong> ${timeSlot.time}</p>`;
      domString += '</li>';
    }
  });
  return domString;
};

export default { buildTimeSlots };

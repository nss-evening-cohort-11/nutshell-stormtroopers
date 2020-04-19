const buildTimeSlots = (timeSlots, reservations) => {
  console.log('reservations in timeslots', reservations);
  let domString = '';
  timeSlots.forEach((timeSlot) => {
    domString += '<div>';
    domString += `<li class="list-group-item individual-time-slot" id="${timeSlot.id}">`;
    domString += `${timeSlot.time}`;
    domString += '</li>';
    domString += '</div>';
  });
  reservations.forEach((reservation) => {
    if (reservation.reservedTimeSlot === true) {
      console.log('reserved time');
      $('#individual-time-slot').addClass('reserved-timeslot');
    }
  });
  return domString;
};

export default { buildTimeSlots };

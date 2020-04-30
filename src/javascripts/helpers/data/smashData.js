import tableData from './tableData';
import timeSlotData from './timeSlotData';
import reservationData from './reservationData';

const getTablesWithReservations = (selectedDate) => new Promise((resolve, reject) => {
  tableData.getTables().then((tables) => {
    timeSlotData.getTimeSlots().then((timeSlots) => {
      const finalTables = [];
      reservationData.getReservations().then((reservationsResponse) => {
        const todaysReservations = reservationsResponse.filter((x) => x.date === selectedDate.toString());
        tables.forEach((table) => {
          const newTable = { ...table };
          const tableReservations = todaysReservations.filter((x) => x.tableId === table.id);
          newTable.timeSlots = timeSlots;
          const newTimeSlot = [];
          timeSlots.forEach((oneTimeSlot) => {
            const timeSlot = { reservations: [], ...oneTimeSlot };
            const isReserved = tableReservations.find((x) => x.timeSlotId === timeSlot.id);
            timeSlot.reservedTimeSlot = isReserved !== undefined;
            timeSlot.tableReservationId = isReserved ? isReserved.id : `nope-${table.id}-${timeSlot.id}`;
            timeSlot.reservations.push(isReserved);
            newTimeSlot.push(timeSlot);
          });
          newTable.timeSlots = newTimeSlot;
          finalTables.push(newTable);
        });
        resolve(finalTables);
      });
    });
  }).catch((err) => reject(err));
});

const getReservationTimeslotsByDate = (selectedDate) => new Promise((resolve, reject) => {
  reservationData.getReservations().then((reservationsResponse) => {
    const todaysReservations = reservationsResponse.filter((x) => x.date === selectedDate.toString());
    timeSlotData.getTimeSlots().then((timeSlots) => {
      todaysReservations.forEach((res) => {
        const reservationTimes = timeSlots.find((x) => x.id === res.timeSlotId);
        res.timeslot = reservationTimes.time;
      });
      resolve(todaysReservations);
    });
  })
    .catch((err) => reject(err));
});

export default { getTablesWithReservations, getReservationTimeslotsByDate };

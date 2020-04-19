import tableData from './tableData';
import timeSlotData from './timeSlotData';
import reservationData from './reservationData';
// import reservations from '../../components/reservations/reservations';
// import reservations from '../../components/reservations/reservations';

const getTablesWithReservations = () => new Promise((resolve, reject) => {
  tableData.getTables().then((tables) => {
    timeSlotData.getTimeSlots().then((timeSlots) => {
      reservationData.getReservations().then((reservationsResponse) => {
        const finalTables = [];
        tables.forEach((table) => {
          const newTable = { reservations: [], ...table };
          const tableReservations = reservationsResponse.filter((x) => x.tableId === table.id);
          newTable.timeSlots = timeSlots;
          timeSlots.forEach((oneTimeSlot) => {
            const timeSlot = { ...oneTimeSlot };
            const isReserved = tableReservations.find((x) => x.timeSlotId === timeSlot.id);
            timeSlot.reservedTimeSlot = isReserved !== undefined;
            timeSlot.tableReservationId = isReserved ? isReserved.id : `nope-${table.id}-${timeSlot.id}`;
            newTable.reservations.push(timeSlot);
          });
          finalTables.push(newTable);
        });
        resolve(finalTables);
      });
    });
  }).catch((err) => reject(err));
});

export default { getTablesWithReservations };

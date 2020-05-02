import axios from 'axios';
import dateArray from '../dateArray';
import tableData from './tableData';
import timeSlotData from './timeSlotData';
import reservationData from './reservationData';
import apiKeys from '../apiKeys.json';
import orderData from './ordersData';
import menuData from './menuData';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getTablesWithReservations = (selectedDate) => new Promise((resolve, reject) => {
  tableData.getTables().then((tables) => {
    timeSlotData.getTimeSlots().then((timeSlots) => {
      const finalTables = [];
      reservationData.getReservations().then((reservationsResponse) => {
        const todaysReservations = reservationsResponse.filter((x) => x.date === selectedDate);
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

const getReservationByDate = (date) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/reservations.json?orderBy="date"&equalTo="${date}"`)
    .then((response) => {
      const rezzies = response.data;
      const rezziesArray = [];
      Object.keys(rezzies).forEach((rezzieDate) => {
        rezzies[rezzieDate].id = rezzieDate;
        rezziesArray.push(rezzies[rezzieDate]);
      });
      resolve(rezziesArray);
    })
    .catch((err) => reject(err));
});

const getOrdersByReservation = (date) => new Promise((resolve, reject) => {
  orderData.getSingleOrders().then((orders) => {
    const ordersArray = [];
    getReservationByDate(date).then((reservations) => {
      reservations.forEach((rez) => {
        const rezOrders = orders.find((x) => x.reservationId === rez.id);
        if (rezOrders) ordersArray.push(rezOrders);
      });
      resolve(ordersArray);
    });
  })
    .catch((err) => reject(err));
});

const getIngredientsByReservationDate = (date) => new Promise((resolve, reject) => {
  getOrdersByReservation(date).then((orders) => {
    const ingredients = [];
    orders.forEach((order) => {
      const menuIngredient = menuData.getIngredientsByMenuItem(order.menuItemId);
      ingredients.push(menuIngredient);
    });
    Promise.all(ingredients)
      .then((results) => {
        resolve(results);
      })
      .catch((err) => reject(err));
  });
});

const getReservationTimeslotsByDate = (selectedDate) => new Promise((resolve, reject) => {
  reservationData.getReservations().then((reservationsResponse) => {
    const todaysReservations = reservationsResponse.filter((x) => x.date === selectedDate);
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

const getSingleReservationWithTimeslot = (reservationId) => new Promise((resolve, reject) => {
  reservationData.getSingleReservation(reservationId).then((reservationResp) => {
    const singleRes = reservationResp.data;
    const reservationTimeslotId = reservationResp.data.timeSlotId;
    timeSlotData.getSingleTimeslot(reservationTimeslotId).then((timeslotResp) => {
      const singleTimeslot = timeslotResp.data;
      singleRes.timeslot = singleTimeslot.time;
      resolve(singleRes);
    });
  })
    .catch((err) => reject(err));
});

const getIngredientsForDateRange = (start, end) => new Promise((resolve, reject) => {
  const dates = dateArray.getDatesForAWeek(start, end);
  const rezRange = [];
  dates.forEach((date) => {
    const rezzie = getIngredientsByReservationDate(date);
    if (rezzie) rezRange.push(rezzie);
  });
  Promise.all(rezRange)
    .then((results) => {
      resolve(results);
      return results;
    }).catch((err) => reject(err));
});

export default {
  getIngredientsForDateRange,
  getReservationTimeslotsByDate,
  getTablesWithReservations,
  getSingleReservationWithTimeslot,
};

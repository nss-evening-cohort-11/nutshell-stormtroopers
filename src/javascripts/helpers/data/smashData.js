import axios from 'axios';
import moment from 'moment';
import tableData from './tableData';
import timeSlotData from './timeSlotData';
import reservationData from './reservationData';
import apiKeys from '../apiKeys.json';
import orderData from './ordersData';
import menuData from './menuData';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getTablesWithReservations = () => new Promise((resolve, reject) => {
  tableData.getTables().then((tables) => {
    timeSlotData.getTimeSlots().then((timeSlots) => {
      const finalTables = [];
      reservationData.getReservations().then((reservationsResponse) => {
        tables.forEach((table) => {
          const newTable = { ...table };
          const tableReservations = reservationsResponse.filter((x) => x.tableId === table.id);
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
      });
  })
    .catch((err) => reject(err));
});

const getDateArray = (start, end) => {
  const dateArray = [];
  const date = new Date(start);
  while (date <= end) {
    dateArray.push(moment(date).format('YYYY-MM-DD'));
    date.setDate(date.getDate() + 1);
  }
  dateArray.forEach((x) => moment(x).format('YYYY-MM-DD'));
  return dateArray;
};

const getDatesForAWeek = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return getDateArray(start, end);
};

const getIngredientsForDateRange = (start, end) => new Promise((resolve, reject) => {
  const dates = getDatesForAWeek(start, end);
  const rezRange = [];
  dates.forEach((date) => {
    const rezzie = getIngredientsByReservationDate(date);
    if (rezzie) rezRange.push(rezzie);
  });
  Promise.all(rezRange)
    .then((results) => {
      resolve(results);
      console.error(results, 'results');
    }).catch((err) => reject(err));
});


getIngredientsForDateRange('2020-04-20', '2020-04-27');

export default { getTablesWithReservations, getIngredientsByReservationDate, getIngredientsForDateRange };

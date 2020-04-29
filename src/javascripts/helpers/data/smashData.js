import axios from 'axios';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import tableData from './tableData';
import timeSlotData from './timeSlotData';
import reservationData from './reservationData';
import apiKeys from '../apiKeys.json';
// import menuData from './menuData';
import orderData from './ordersData';
import menuData from './menuData';

const moment = extendMoment(Moment);
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
      console.error(rezziesArray, 'rezziesArray');
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
      console.error(ordersArray, 'ordersArray');
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
        console.error(results, 'results');
      });
  })
    .catch((err) => reject(err));
});

getIngredientsByReservationDate('2020-04-21');

const getDates = (startDate) => {
  const start = new Date(moment().format(startDate));
  const end = new Date(moment().add(7, 'days'));
  console.error(end, 'end');
  const timeRange = moment.range(start, end);
  const timeArray = Array.from(timeRange.by('days'));
  console.error(timeRange);
  console.error(timeArray);
};

getDates('2020-04-01');

export default { getTablesWithReservations };

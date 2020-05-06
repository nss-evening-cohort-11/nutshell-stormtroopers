import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllOrders = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/orders.json`)
    .then((response) => {
      const ordersData = response.data;
      const ordersArray = [];

      Object.keys(ordersData).forEach((orderId) => {
        ordersData[orderId].id = orderId;
        ordersArray.push(ordersData[orderId]);
      });
      resolve(ordersArray);
    })
    .catch((err) => reject(err));
});

const getSingleOrders = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/orders.json`)
    .then((response) => {
      const zeSingleOrders = response.data;
      const menuArray = [];
      Object.keys(zeSingleOrders).forEach((orderId) => {
        zeSingleOrders[orderId].id = orderId;
        menuArray.push(zeSingleOrders[orderId]);
      });
      resolve(menuArray);
    })
    .catch((err) => reject(err));
});

const getOrdersByReservationId = (reservationId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/orders.json?orderBy="reservationId"&equalTo="${reservationId}"`)
    .then((response) => {
      const orders = response.data;

      resolve(orders);
    })
    .catch((err) => reject(err));
});

const deleteOrder = (orderId) => axios.delete(`${baseUrl}/orders/${orderId}.json`);

const addOrder = (newOrder) => axios.post(`${baseUrl}/orders.json`, newOrder);

export default {
  getAllOrders,
  deleteOrder,
  addOrder,
  getSingleOrders,
  getOrdersByReservationId,
};

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

export default { getAllOrders };

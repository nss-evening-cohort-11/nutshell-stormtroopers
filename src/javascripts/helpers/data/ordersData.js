import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

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

export default { getSingleOrders };

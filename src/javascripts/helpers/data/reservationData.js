import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getReservations = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/reservations.json`)
    .then((response) => {
      const allReservations = response.data;
      const reservations = [];
      Object.keys(allReservations).forEach((reservationId) => {
        allReservations[reservationId].id = reservationId;
        reservations.push(allReservations[reservationId]);
      });
      resolve(reservations);
    })
    .catch((err) => reject(err));
});

const addReservation = (newReservation) => axios.post(`${baseUrl}/reservations.json`, newReservation);

export default { getReservations, addReservation };

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

const getSingleReservation = (reservationId) => axios.get(`${baseUrl}/reservations/${reservationId}.json`);

const editReservation = (editedReservationId, newNumOfGuests, newPartyName) => axios.patch(`${baseUrl}/reservations/${editedReservationId}.json`, { numOfGuests: newNumOfGuests, partyName: newPartyName });

const editEntireReservation = (reservationId, modifiedResObject) => axios.put(`${baseUrl}/reservations/${reservationId}.json`, modifiedResObject);

const deleteReservation = (axedReservationId) => axios.delete(`${baseUrl}/reservations/${axedReservationId}.json`);

const addReservation = (newReservation) => axios.post(`${baseUrl}/reservations.json`, newReservation);

export default {
  getReservations,
  getSingleReservation,
  addReservation,
  deleteReservation,
  editReservation,
  editEntireReservation,
};

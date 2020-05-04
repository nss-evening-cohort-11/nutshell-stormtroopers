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

<<<<<<< HEAD
const getReservationById = (reservationId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/reservations/${reservationId}.json`)
    .then((response) => {
      const reservation = response.data;

      resolve(reservation);
    })
    .catch((err) => reject(err));
});
=======
const getSingleReservation = (reservationId) => axios.get(`${baseUrl}/reservations/${reservationId}.json`);
>>>>>>> b7772d1c0977b001215915bddf0dcb98e1da66f3

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
<<<<<<< HEAD
  getReservationById,
=======
  editEntireReservation,
>>>>>>> b7772d1c0977b001215915bddf0dcb98e1da66f3
};

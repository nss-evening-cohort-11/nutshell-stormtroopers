import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getTimeSlots = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/timeSlots.json`)
    .then((response) => {
      const allTimeSlots = response.data;
      const timeSlots = [];
      Object.keys(allTimeSlots).forEach((timeSlotId) => {
        allTimeSlots[timeSlotId].id = timeSlotId;
        timeSlots.push(allTimeSlots[timeSlotId]);
      });
      resolve(timeSlots);
    })
    .catch((err) => reject(err));
});

const getSingleTimeslot = (timeSlotId) => axios.get(`${baseUrl}/timeSlots/${timeSlotId}.json`);

export default { getTimeSlots, getSingleTimeslot };

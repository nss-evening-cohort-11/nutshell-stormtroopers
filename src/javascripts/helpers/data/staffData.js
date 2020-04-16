import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllStaffMembers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staff.json`)
    .then((response) => {
      const demStaffMembers = response.data;
      const staff = [];
      Object.keys(demStaffMembers).forEach((staffId) => {
        demStaffMembers[staffId].id = staffId;
        staff.push(demStaffMembers[staffId]);
      });
      resolve(staff);
    })
    .catch((err) => reject(err));
});

export default { getAllStaffMembers };

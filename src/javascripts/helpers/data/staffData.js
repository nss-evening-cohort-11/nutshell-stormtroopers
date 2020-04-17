import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllStaffMembers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staff.json`)
    .then((response) => {
      const theseStaffMembers = response.data;
      const staff = [];
      Object.keys(theseStaffMembers).forEach((staffId) => {
        theseStaffMembers[staffId].id = staffId;
        staff.push(theseStaffMembers[staffId]);
      });
      resolve(staff);
    })
    .catch((err) => reject(err));
});

const getStaffByJobId = (jobId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staff.json?orderBy="jobId"&equalTo="${jobId}"`)
    .then((response) => {
      const theseStaffMembers = response.data;
      const selectedStaff = [];
      Object.keys(theseStaffMembers).forEach((staffId) => {
        theseStaffMembers[staffId].id = staffId;
        selectedStaff.push(theseStaffMembers[staffId]);
      });
      resolve(selectedStaff);
    })
    .catch((err) => reject(err));
});

const setStaffMember = (newStaffMember) => axios.post(`${baseUrl}/staff.json`, newStaffMember);

export default { getAllStaffMembers, getStaffByJobId, setStaffMember };

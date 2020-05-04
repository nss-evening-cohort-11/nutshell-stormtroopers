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
  axios.get(`${baseUrl}/staff.json`)
    .then((response) => {
      const theseStaffMembers = response.data;
      const staffArr = [];
      Object.keys(theseStaffMembers).forEach((staffId) => {
        theseStaffMembers[staffId].id = staffId;
        staffArr.push(theseStaffMembers[staffId]);
      });
      const selectedStaff = staffArr.filter((x) => x.jobId === jobId);
      resolve(selectedStaff);
    })
    .catch((err) => reject(err));
});

const getStaffMemberById = (staffId) => axios.get(`${baseUrl}/staff/${staffId}.json`);

const setStaffMember = (newStaffMember) => axios.post(`${baseUrl}/staff.json`, newStaffMember);

const updateStaffMember = (staffId, modifiedStaffMember) => axios.put(`${baseUrl}/staff/${staffId}.json`, modifiedStaffMember);

const removeStaffMember = (staffId) => axios.delete(`${baseUrl}/staff/${staffId}.json`);

export default {
  getAllStaffMembers,
  getStaffByJobId,
  setStaffMember,
  updateStaffMember,
  removeStaffMember,
  getStaffMemberById,
};

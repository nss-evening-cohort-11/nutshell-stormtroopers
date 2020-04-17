import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllJobs = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/jobs.json`)
    .then((response) => {
      const demJobs = response.data;
      const jobs = [];
      Object.keys(demJobs).forEach((jobId) => {
        demJobs[jobId].id = jobId;
        jobs.push(demJobs[jobId]);
      });
      resolve(jobs);
    })
    .catch((err) => reject(err));
});

const getSingleJobById = (jobId) => axios.get(`${baseUrl}/jobs/${jobId}.json`);

export default { getAllJobs, getSingleJobById };

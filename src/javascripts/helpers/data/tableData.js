import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getTables = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/tables.json`)
    .then((response) => {
      const allTables = response.data;
      const tables = [];
      Object.keys(allTables).forEach((tableId) => {
        allTables[tableId].id = tableId;
        tables.push(allTables[tableId]);
      });
      resolve(tables);
    })
    .catch((err) => reject(err));
});

export default { getTables };

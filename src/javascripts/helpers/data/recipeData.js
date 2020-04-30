import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getRecipes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recipes.json`)
    .then((response) => {
      const zeRecipes = response.data;
      const menuArray = [];
      Object.keys(zeRecipes).forEach((recipeId) => {
        zeRecipes[recipeId].id = recipeId;
        menuArray.push(zeRecipes[recipeId]);
      });
      resolve(menuArray);
    })
    .catch((err) => reject(err));
});

export default { getRecipes };

import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getIngredients = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ingredients.json`)
    .then((response) => {
      const theIngredients = response.data;
      const ingredients = [];
      if (theIngredients) {
        Object.keys(theIngredients).forEach((ingredientId) => {
          theIngredients[ingredientId].id = ingredientId;
          ingredients.push(theIngredients[ingredientId]);
        });
      }
      resolve(ingredients);
    })
    .catch((err) => reject(err));
});

const addIngredient = (newIngredient) => axios.post(`${baseUrl}/ingredients.json`, newIngredient);

export default { getIngredients, addIngredient };

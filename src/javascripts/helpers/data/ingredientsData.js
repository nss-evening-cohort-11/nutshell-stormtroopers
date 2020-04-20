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

const getSingleIngredient = (ingredientId) => axios.get(`${baseUrl}/ingredients/${ingredientId}.json`);

const addIngredient = (newIngredient) => axios.post(`${baseUrl}/ingredients.json`, newIngredient);

const deleteIngredient = (ingredientId) => axios.delete(`${baseUrl}/ingredients/${ingredientId}.json`);

const updateIngredient = (ingredientId, modifiedIngredient) => axios.put(`${baseUrl}/ingredients/${ingredientId}.json`, modifiedIngredient);

export default {
  getIngredients,
  addIngredient,
  deleteIngredient,
  getSingleIngredient,
  updateIngredient,
};

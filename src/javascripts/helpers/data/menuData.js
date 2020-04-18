import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getMenuItems = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/menuItems.json`)
    .then((response) => {
      const theseMenuItems = response.data;
      const menuArray = [];
      Object.keys(theseMenuItems).forEach((menuItemId) => {
        theseMenuItems[menuItemId].id = menuItemId;
        menuArray.push(theseMenuItems[menuItemId]);
      });
      resolve(menuArray);
    })
    .catch((err) => reject(err));
});

// update to ingredientData.getIngredients ?
const getIngredients = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ingredients.json`)
    .then((response) => {
      const thoseIngredients = response.data;
      const ingredientsArray = [];
      Object.keys(thoseIngredients).forEach((ingredientId) => {
        thoseIngredients[ingredientId].id = ingredientId;
        ingredientsArray.push(thoseIngredients[ingredientId]);
      });
      resolve(ingredientsArray);
    })
    .catch((err) => reject(err));
});

// const getRecipes = () => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/recipes.json`)
//     .then((response) => {
//       const thoseRecipes = response.data;
//       const recipesArray = [];
//       Object.keys(thoseRecipes).forEach((recipeId) => {
//         thoseRecipes[recipeId].id = recipeId;
//         recipesArray.push(thoseRecipes[recipeId]);
//       });
//       resolve(recipesArray);
//     })
//     .catch((err) => reject(err));
// });

const getMenuItemIngredients = (menuItemId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recipes.json?orderBy="menuItemId"&equalTo="${menuItemId}"`)
    .then((response) => {
      const thoseItemIngreds = response.data;
      const itemIngredsArray = [];
      // ['farmerCow1', 'farmerCow2'].forEach()
      Object.keys(thoseItemIngreds).forEach((itemIngredId) => {
        thoseItemIngreds[itemIngredId].id = itemIngredId;
        itemIngredsArray.push(thoseItemIngreds[itemIngredId]);
      });
      resolve(itemIngredsArray);
    })
    .catch((err) => reject(err));
});

const smashFunction = (menuItemId) => new Promise((resolve, reject) => {
  // eslint-disable-next-line no-param-reassign
  menuItemId.ingredients = [];
  getMenuItemIngredients(menuItemId)
    .then((menuItemIngredients) => {
      getIngredients()
        .then((allIngredients) => {
          menuItemIngredients.forEach((mII) => {
            const addIngred = allIngredients.find((x) => x.id === mII.itemIngredId);
            menuItemId.ingredients.push(addIngred);
          });
          resolve(menuItemId);
          console.error(menuItemId);
        });
    })
    .catch((err) => reject(err));
});

export default { getMenuItems, getMenuItemIngredients, smashFunction };

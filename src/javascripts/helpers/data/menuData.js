import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllMenuItems = () => new Promise((resolve, reject) => {
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

const getSingleMenuItem = (menuItemId) => axios.get(`${baseUrl}/menuItems/${menuItemId}.json`);

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

const getMenuItemRecipes = (menuItemId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recipes.json?orderBy="menuItemId"&equalTo="${menuItemId}"`)
    .then((response) => {
      const thoseItemRecipes = response.data;
      const itemRecipesArray = [];
      Object.keys(thoseItemRecipes).forEach((itemIngredId) => {
        thoseItemRecipes[itemIngredId].id = itemIngredId;
        itemRecipesArray.push(thoseItemRecipes[itemIngredId]);
      });
      resolve(itemRecipesArray);
    })
    .catch((err) => reject(err));
});

const deleteItemFromRecipe = (ingredientId, menuItemId) => {
  console.error(`delete ${ingredientId} from ${menuItemId}`);
};

const getIngredientsByMenuItem = (menuItem) => new Promise((resolve, reject) => {
  getMenuItemRecipes(menuItem)
    .then((menuItemRecipes) => {
      const ingredients = [];
      getIngredients()
        .then((allIngredients) => {
          menuItemRecipes.forEach((mIR) => {
            const addIngred = allIngredients.find((x) => x.id === mIR.ingredientId);
            ingredients.push(addIngred);
          });
          resolve(ingredients);
        });
    })
    .catch((err) => reject(err));
});

export default {
  getAllMenuItems,
  getMenuItemRecipes,
  getIngredientsByMenuItem,
  getSingleMenuItem,
  deleteItemFromRecipe,
};

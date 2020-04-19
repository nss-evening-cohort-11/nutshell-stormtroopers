import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

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

const deleteItemFromRecipe = (ingredientId, menuItemId) => {
  getMenuItemRecipes(menuItemId)
    .then((recipes) => {
      const removeThis = recipes.find((r) => ingredientId === r.ingredientId);
      axios.delete(`${baseUrl}/recipes/${removeThis.id}.json`)
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          showIngredientEdits(menuItemId);
        });
    });
};

const deleteRecipeItem = (e) => {
  e.preventDefault();
  const ingredToDelete = e.target.closest('.delete-ingred').id;
  const parentMenuItem = e.target.closest('.card').id;
  deleteItemFromRecipe(ingredToDelete, parentMenuItem);
  // eslint-disable-next-line no-use-before-define
  // menuData.getIngredientsByMenuItem(parentMenuItem)
  //   .then((ingredList) => {
  //     let domString = '';
  //     ingredList.forEach((item) => {
  //       domString += `<button type="button" class="btn btn-light col-10 delete-ingred" id="${item.id}"><i class="far fa-times-circle"></i> ${item.name}</button>`;
  //     });
  //     domString += `<br><button type="button" class="btn btn-secondary col-10 save-ingred" id="${parentMenuItem}"><i class="far fa-check-circle"></i> Save</button>`;
  //     utils.printToDom(`card-body-${parentMenuItem}`, domString);
  //     $('.delete-ingred').on('click', deleteRecipeItem);
  //   });
  // eslint-disable-next-line no-use-before-define
  showIngredientList(parentMenuItem);
};

const showIngredientEdits = (menuItemId) => {
  getIngredientsByMenuItem(menuItemId)
    .then((ingredList) => {
      let domString = '';
      ingredList.forEach((item) => {
        domString += `<button type="button" class="btn btn-light col-10 delete-ingred" id="${item.id}"><i class="far fa-times-circle"></i> ${item.name}</button>`;
      });
      domString += `<br><button type="button" class="btn btn-secondary col-10 save-ingred" id="${menuItemId}"><i class="far fa-check-circle"></i> Save</button>`;
      utils.printToDom(`card-body-${menuItemId}`, domString);
      // eslint-disable-next-line no-use-before-define
      $('.delete-ingred').on('click', deleteRecipeItem);
    });
};

const showIngredientList = (menuItemId) => {
  getIngredientsByMenuItem(menuItemId)
    .then((ingredList) => {
      let domString = '';
      domString += '<p class="card-text">Ingredients:</p>';
      ingredList.forEach((item) => {
        domString += `<p>${item.name}</p>`;
      });
      domString += `<button type="button" class="btn btn-secondary col-6 edit-ingred" id="${menuItemId}"><i class="far fa-edit"></i> Ingredients</button>`;
      domString += '<button type="button" class="btn btn-secondary col-5 edit-item"><i class="far fa-edit"></i> Details</button>';
      domString += '<button type="button" class="btn btn-secondary col-10 back-btn"><i class="fas fa-reply"></i> Go Back</button>';
      utils.printToDom(`card-body-${menuItemId}`, domString);
    });
};

export default {
  getAllMenuItems,
  getMenuItemRecipes,
  getIngredientsByMenuItem,
  getSingleMenuItem,
  deleteItemFromRecipe,
  showIngredientEdits,
  showIngredientList,
};

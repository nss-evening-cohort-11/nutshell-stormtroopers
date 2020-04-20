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

const buildMenuCards = () => {
  getAllMenuItems()
    .then((menuArray) => {
      let domString = '';
      menuArray.forEach((item) => {
        domString += '<div class="col-4">';
        domString += '<div id="whole-card-container">';
        domString += `  <div class="card menu-item-card" id="${item.id}">`;
        domString += `    <h5 class="card-header">${item.name}</h5>`;
        domString += `    <div class="card-body" id="card-body-${item.id}">`;
        domString += `      <div class="img-holder"><img src="${item.imageUrl}" style="width: 100%"></div>`;
        domString += `      <div class="desc-holder" id="desc-${item.id}"><p class="card-text">${item.description}<br>`;
        domString += `      ${item.price}</p>`;
        domString += `      <button type="button" class="btn btn-light col-10 offset-1 view-ingred" id="${item.id}"><i class="far fa-list-alt"></i> Ingredients/Info</button></div>`;
        domString += '    </div>';
        domString += '  </div>';
        domString += '</div>';
        domString += '</div>';
      });
      domString += '</div>';
      utils.printToDom('inner-menu-container', domString);
    })
    .catch((err) => console.error('problem with menuBuilder', err));
};

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
  showIngredientEdits(parentMenuItem);
};

const showIngredientEdits = (menuItemId) => {
  getIngredientsByMenuItem(menuItemId)
    .then((ingredList) => {
      let domString = '';
      ingredList.forEach((item) => {
        domString += `<button type="button" class="btn btn-light col-10 delete-ingred" id="${item.id}"><i class="far fa-times-circle"></i> ${item.name}</button>`;
      });
      domString += `<br><button type="button" class="btn btn-light col-10 add-ingred" id="${menuItemId}"><i class="fas fa-plus"></i> Add</button>`;
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
      domString += `<button type="button" class="btn btn-secondary col-5 edit-item" id="${menuItemId}"><i class="far fa-edit"></i> Details</button>`;
      domString += '<button type="button" class="btn btn-secondary col-10 back-btn"><i class="fas fa-reply"></i> Go Back</button>';
      utils.printToDom(`card-body-${menuItemId}`, domString);
    });
};

const addSelectedIngreds = (e) => {
  const menuItem = e.target.id;
  const ingredsToAdd = utils.getCheckboxVal();
  ingredsToAdd.forEach((item) => {
    const newRecipe = {
      menuItemId: menuItem,
      ingredientId: item,
    };
    axios.post(`${baseUrl}/recipes.json`, newRecipe).then(buildMenuCards());
    // BUILD CARDS NEEDS A DELAY TO PRINT THE FRESH DATABASE...
  });
};

const showAvailableIngreds = (e) => {
  e.preventDefault();
  const menuItemId = e.target.id;
  getIngredients()
    .then((allIngreds) => {
      let domString = '';
      domString += '<div class="form-check">';
      allIngreds.forEach((item) => {
        domString += '<div class="row">';
        domString += `<input class="form-check-input add-ingred-checks" type="checkbox" value="${item.id}" id="${item.id}">`;
        domString += `<label class="form-check-label" for="itemName">${item.name}</label>`;
        domString += '</div>';
      });
      domString += `<br><button type="button" class="btn btn-secondary col-10 save-recipe" id="${menuItemId}"><i class="far fa-check-circle"></i> Save</button>`;
      domString += '</div>';
      utils.printToDom('inner-menu-container', domString);
      $('.save-recipe').on('click', addSelectedIngreds);
    });
};

const getAllRecipes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recipes.json`)
    .then((response) => {
      const thoseRecipes = response.data;
      const recipesArray = [];
      Object.keys(thoseRecipes).forEach((recipeId) => {
        thoseRecipes[recipeId].id = recipeId;
        recipesArray.push(thoseRecipes[recipeId]);
      });
      resolve(recipesArray);
    })
    .catch((err) => reject(err));
});

const getMenuItemsByIngredient = (ingredId) => new Promise((resolve, reject) => {
  let filteredRecipes = [];
  getAllRecipes()
    .then((allRecipes) => {
      filteredRecipes = allRecipes.filter((recipe) => recipe.ingredientId === ingredId);
      resolve(filteredRecipes);
    })
    .catch((err) => reject(err));
});

const showFilteredMenuCards = () => {
  const checkedRadio = utils.getRadioVal();
  getMenuItemsByIngredient(checkedRadio)
    .then((filteredRecipesArray) => {
      let domString = '';
      const filteredItemsArray = [];
      console.error('filtered recipes', filteredRecipesArray);
      filteredRecipesArray.forEach((recipe) => {
        getAllMenuItems()
          .then((allMenuItems) => {
            allMenuItems.forEach((item) => {
              if (item.id === recipe.menuItemId) {
                filteredItemsArray.push(item);
              }
            });
            filteredItemsArray.forEach((item) => {
              domString += '<div class="col-4">';
              domString += '<div id="whole-card-container">';
              domString += `  <div class="card menu-item-card" id="${item.id}">`;
              domString += `    <h5 class="card-header">${item.name}</h5>`;
              domString += `    <div class="card-body" id="card-body-${item.id}">`;
              domString += `      <div class="img-holder"><img src="${item.imageUrl}" style="width: 100%"></div>`;
              domString += `      <div class="desc-holder" id="desc-${item.id}"><p class="card-text">${item.description}<br>`;
              domString += `      ${item.price}</p>`;
              domString += `      <button type="button" class="btn btn-light col-10 offset-1 view-ingred" id="${item.id}"><i class="far fa-list-alt"></i> Ingredients/Info</button></div>`;
              domString += '    </div>';
              domString += '  </div>';
              domString += '</div>';
              domString += '</div>';
              domString += '</div>';
              utils.printToDom('inner-menu-container', domString);
            });
          });
      });
    });
};


const buildFilterList = () => {
  getIngredients()
    .then((allIngreds) => {
      let domString = '';
      domString += '<div class="form-check">';
      allIngreds.forEach((item) => {
        domString += '<div class="row">';
        domString += `<input class="form-check-input filter-ingred-radios" type="radio" value="${item.id}" id="${item.id}">`;
        domString += `<label class="form-check-label" for="itemName">${item.name}</label>`;
        domString += '</div>';
      });
      domString += '<br><button type="button" class="btn btn-secondary col-12" id="apply-filter"><i class="far fa-check-circle"></i> Apply Filter</button>';
      domString += '</div>';
      utils.printToDom('inner-menu-container', domString);
      $('body').on('click', '#apply-filter', showFilteredMenuCards);
    });
};

const submitMenuItemChanges = (e) => {
  const menuItemId = e.target.id;
  const newName = $(`#${menuItemId}NameInput`).val();
  const newDesc = $(`#${menuItemId}DescInput`).val();
  const newImage = $(`#${menuItemId}ImageInput`).val();
  axios.patch(`${baseUrl}/menuItems/${menuItemId}.json`, { name: newName });
  axios.patch(`${baseUrl}/menuItems/${menuItemId}.json`, { description: newDesc });
  axios.patch(`${baseUrl}/menuItems/${menuItemId}.json`, { imageUrl: newImage });
  buildMenuCards();
};

const deleteEntireItem = (e) => {
  const menuItem = e.target.id;
  axios.delete(`${baseUrl}/menuItems/${menuItem}.json`)
    .then(() => {
      getMenuItemRecipes(menuItem)
      // delete each recipe for that Item
        .then((recipesArray) => {
          recipesArray.forEach((recipe) => {
            axios.delete(`${baseUrl}/recipes/${recipe.id}.json`);
          });
          buildMenuCards();
        });
    });
};

const getSingleMenuItem = (menuItemId) => axios.get(`${baseUrl}/menuItems/${menuItemId}.json`);

const showItemEditor = (menuItem) => {
  getSingleMenuItem(menuItem)
    .then((response) => {
      const thisMenuItem = response.data;
      thisMenuItem.id = menuItem;
      let domString = '';
      domString += '<form>';
      domString += '  <div class="form-group">';
      domString += '    <label for="itemNameInput">Item Name:</label>';
      domString += `    <input type="text" class="form-control" id="${thisMenuItem.id}NameInput" value="${thisMenuItem.name}">`;
      domString += '  </div>';
      domString += '  <div class="form-group">';
      domString += '    <label for="itemDescInput">Description:</label>';
      domString += `    <input type="text" class="form-control" id="${thisMenuItem.id}DescInput" value="${thisMenuItem.description}">`;
      domString += '  </div>';
      domString += '  <div class="form-group">';
      domString += '    <label for="itemImageInput">Image URL:</label>';
      domString += `    <input type="text" class="form-control" id="${thisMenuItem.id}ImageInput" value="${thisMenuItem.imageUrl}">`;
      domString += '  </div>';
      domString += `  <br><button type="button" class="btn btn-secondary col-10 save-details" id="${menuItem}"><i class="far fa-check-circle"></i> Save</button>`;
      domString += `  <br><button type="button" class="btn btn-secondary col-10 delete-item" id="${menuItem}"><i class="far fa-trash-alt"></i> Delete Item</button>`;
      domString += '</form>';
      utils.printToDom(`card-body-${menuItem}`, domString);
      $('body').on('click', '.save-details', submitMenuItemChanges);
      $('body').on('click', '.delete-item', deleteEntireItem);
    });
};

const addNewItem = (e) => {
  e.preventDefault();
  const newMenuItem = {
    name: $('#input-item-name').val(),
    description: $('#input-item-desc').val(),
    category: $('#input-item-category').val(),
    genre: $('#input-item-genre').val(),
    price: $('#input-item-price').val(),
  };
  axios.post(`${baseUrl}/menuItems.json`, newMenuItem)
    .then(() => {
      $('#add-menu-item-modal').modal('hide');
      buildMenuCards();
    });
};

export default {
  getAllMenuItems,
  buildMenuCards,
  buildFilterList,
  getMenuItemRecipes,
  getIngredientsByMenuItem,
  getSingleMenuItem,
  deleteItemFromRecipe,
  showIngredientEdits,
  showIngredientList,
  showAvailableIngreds,
  addSelectedIngreds,
  showItemEditor,
  addNewItem,
};

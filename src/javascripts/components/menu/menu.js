// import axios from 'axios';
// import apiKeys from '../../helpers/apiKeys.json';
import './menu.scss';
import utils from '../../helpers/utils';
import menuData from '../../helpers/data/menuData';

const deleteRecipeItem = (e) => {
  e.preventDefault();
  const ingredToDelete = e.target.closest('.delete-ingred').id;
  const parentMenuItem = e.target.closest('.card').id;
  menuData.deleteItemFromRecipe(ingredToDelete, parentMenuItem);
  // then reprint remaining ingredients
};

const editMenuItemIngredients = (e) => {
  e.preventDefault();
  const menuItemId = e.target.closest('.edit-ingred').id;
  menuData.getIngredientsByMenuItem(menuItemId)
    .then((ingredList) => {
      let domString = '';
      ingredList.forEach((item) => {
        domString += `<button type="button" class="btn btn-light col-10 delete-ingred" id="${item.id}"><i class="far fa-times-circle"></i> ${item.name}</button>`;
      });
      domString += `<br><button type="button" class="btn btn-secondary col-10 save-ingred" id="${menuItemId}"><i class="far fa-check-circle"></i> Save</button>`;
      utils.printToDom(`card-body-${menuItemId}`, domString);
      $('.delete-ingred').on('click', deleteRecipeItem);
    });
  // $('.save-ingred').on('click', console.error('clicked Save'));
  //
};

const closeIngredientView = (e) => {
  const selectedCard = e.target.closest('.menu-item-card').id;
  menuData.getSingleMenuItem(selectedCard)
    .then((response) => {
      const item = response.data;
      let domString = '';
      domString += `    <div class="card-body" id="card-body-${item.id}">`;
      domString += `      <div class="img-holder"><img src="${item.imageUrl}" style="width: 100%"></div>`;
      domString += `      <div class="desc-holder" id="desc-${item.id}"><p class="card-text">${item.description}<br>`;
      domString += `      ${item.price}</p>`;
      domString += `      <button type="button" class="btn btn-light col-10 offset-1 view-ingred" id="${item.id}"><i class="far fa-list-alt"></i> Ingredients</button></div>`;
      domString += '    </div>';
      utils.printToDom(`card-body-${selectedCard}`, domString);
      utils.printToDom(`btn-holder-${selectedCard}`, '');
    });
};

const openIngredientView = (e) => {
  const selectedCard = e.target.closest('.menu-item-card').id;
  menuData.getIngredientsByMenuItem(selectedCard)
    .then((ingredList) => {
      let domString = '';
      domString += '<p class="card-text">Ingredients:</p>';
      ingredList.forEach((item) => {
        domString += `<p>${item.name}</p>`;
      });
      domString += `<button type="button" class="btn btn-secondary col-6 edit-ingred" id="${selectedCard}"><i class="far fa-edit"></i> Ingredients</button>`;
      domString += '<button type="button" class="btn btn-secondary col-5 edit-item"><i class="far fa-edit"></i> Details</button>';
      domString += '<button type="button" class="btn btn-secondary col-10 back-btn"><i class="fas fa-reply"></i> Go Back</button>';
      utils.printToDom(`card-body-${selectedCard}`, domString);
      $('.edit-ingred').on('click', editMenuItemIngredients);
      $('.back-btn').on('click', closeIngredientView);
    });
};

const menuBuilder = () => {
  menuData.getAllMenuItems()
    .then((menuArray) => {
      let domString = '';
      domString += '<h2 class="text-center" style="font-family: Allura">Menu</h2>';
      domString += '<div class="row wrap">';
      menuArray.forEach((item) => {
        domString += '<div class="col-3">';
        domString += '<div id="whole-card-container">';
        domString += `  <div class="card menu-item-card" id="${item.id}">`;
        domString += `    <h5 class="card-header">${item.name}</h5>`;
        domString += `    <div class="card-body" id="card-body-${item.id}">`;
        domString += `      <div class="img-holder"><img src="${item.imageUrl}" style="width: 100%"></div>`;
        domString += `      <div class="desc-holder" id="desc-${item.id}"><p class="card-text">${item.description}<br>`;
        domString += `      ${item.price}</p>`;
        domString += `      <button type="button" class="btn btn-light col-10 offset-1 view-ingred" id="${item.id}"><i class="far fa-list-alt"></i> Ingredients</button></div>`;
        domString += '    </div>';
        domString += '  </div>';
        domString += '</div>';
        domString += '</div>';
      });
      domString += '</div>';
      utils.printToDom('menu-section', domString);
    })
    .catch((err) => console.error('problem with menuBuilder', err));
  $('body').on('click', '.view-ingred', openIngredientView);
};

const buildMenuSection = () => {
  const domString = '<h2>Menu</h2>';
  utils.printToDom('menu-section', domString);
  $('#home-page').addClass('hide');
  $('#staff-section').addClass('hide');
  $('#reservations-section').addClass('hide');
  $('#menu-section').removeClass('hide');
  $('#ingredients-section').addClass('hide');
  menuBuilder();
};

export default { buildMenuSection, menuBuilder };

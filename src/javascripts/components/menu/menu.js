// import axios from 'axios';
// import apiKeys from '../../helpers/apiKeys.json';
import './menu.scss';
import utils from '../../helpers/utils';
import menuData from '../../helpers/data/menuData';

const editMenuItemIngredients = (e) => {
  e.preventDefault();
  const menuItemId = e.target.id;
  menuData.showIngredientEdits(menuItemId);
  // eslint-disable-next-line no-use-before-define
  $('body').on('click', '.save-ingred', openIngredientView);
  $('body').on('click', '.add-ingred', menuData.showAvailableIngreds);
};

const editMenuItemDetails = (e) => {
  e.preventDefault();
  const menuItemId = e.target.id;
  menuData.showItemEditor(menuItemId);
  // eslint-disable-next-line no-use-before-define
  // $('body').on('click', '.save-ingred', openIngredientView);
  // $('body').on('click', '.add-ingred', menuData.showAvailableIngreds);
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
  menuData.showIngredientList(selectedCard);
  $('body').on('click', '.edit-ingred', editMenuItemIngredients);
  $('body').on('click', '.edit-item', editMenuItemDetails);
  $('body').on('click', '.back-btn', closeIngredientView);
};

const menuBuilder = () => {
  menuData.buildMenuCards();
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

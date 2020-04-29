import './menu.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import menuData from '../../helpers/data/menuData';
import menuForm from './menuAddForm';

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
  $('body').on('click', '.back-btn', closeIngredientView);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $(document).ready(() => {
        $('.edit-ingred').removeClass('disabled');
        $('.edit-item').removeClass('disabled');
        $('body').on('click', '.edit-ingred', editMenuItemIngredients);
        $('body').on('click', '.edit-item', editMenuItemDetails);
      });
    } else {
      $(document).ready(() => {
        $('.edit-ingred').addClass('disabled');
        $('.edit-item').addClass('disabled');
      });
    }
  });
};

const menuBuilder = () => {
  menuData.buildMenuCards();
  $('body').on('click', '.view-ingred', openIngredientView);
};

const buildFilterList = () => {
  menuData.buildFilterList();
};

const buildMenuSection = () => {
  let domString = '';
  domString += '<h2 class="text-center" style="font-family: Allura">Menu</h2>';
  domString += '  <div class="text-center"><button type="button" class="btn btn-secondary col-3 disabled" id="add-item">Add Item</button>';
  domString += '  <button type="button" class="btn btn-secondary col-3" id="view-all">View All</button>';
  domString += '  <button type="button" class="btn btn-secondary col-3" id="view-filter">Filter by Ingredient</button></div>';
  domString += '<div class="row wrap text-center" id="inner-menu-container"></div>';
  utils.printToDom('menu-section', domString);
  $('#home-page').addClass('hide');
  $('#staff-section-container').addClass('hide');
  $('#reservations-section').addClass('hide');
  $('#menu-section').removeClass('hide');
  $('#ingredients-section').addClass('hide');
  $('#reporting-section').addClass('hide');
  $('body').on('click', '#view-all', menuBuilder);
  $('body').on('click', '#view-filter', buildFilterList);
  menuBuilder();
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $(document).ready(() => {
        $('#navbar-logout-button').removeClass('hide');
        $('#login-button').addClass('hide');
        $('#add-item').removeClass('disabled');
        $('body').on('click', '#add-item', menuForm.menuModalBuilder);
      });
    } else {
      $(document).ready(() => {
        $('#navbar-logout-button').addClass('hide');
        $('#login-button').removeClass('hide');
        $('#add-item').addClass('disabled');
      });
    }
  });
};

export default {
  buildMenuSection,
  menuBuilder,
};

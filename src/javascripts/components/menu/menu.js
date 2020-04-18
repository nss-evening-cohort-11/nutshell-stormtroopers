// import axios from 'axios';
// import apiKeys from '../../helpers/apiKeys.json';
import './menu.scss';
import utils from '../../helpers/utils';
import menuData from '../../helpers/data/menuData';

const editMenuItemIngredients = (e) => {
  const menuItemId = e.target.closest('.edit-ingred').id;
  console.error('editing menu Item:', menuItemId);
  menuData.getMenuItemIngredients(menuItemId);
};

const menuHoverEnter = (e) => {
  const hoverCard = e.target.closest('.menu-item-card').id;
  let domString = '';
  const emptyString = '';
  domString += '<p class="card-text">Ingredients:</p>';
  domString += `<button type="button" class="btn btn-secondary col-6 edit-ingred" id="${hoverCard}"><i class="far fa-edit"></i> Ingredients</button>`;
  domString += '<button type="button" class="btn btn-secondary col-5 edit-item"><i class="far fa-edit"></i> Details</button>';
  utils.printToDom(`desc-${hoverCard}`, domString);
  utils.printToDom(`price-${hoverCard}`, emptyString);
  $('.edit-ingred').on('click', editMenuItemIngredients);
};

const menuHoverLeave = (e) => {
  const hoverCard = e.target.closest('.menu-item-card').id;
  let domString = '';
  domString += '<p class="card-text">Description:</p>';
  utils.printToDom(`desc-${hoverCard}`, domString);
};

const menuBuilder = () => {
  menuData.getMenuItems()
    .then((menuArray) => {
      let domString = '';
      domString += '<h2 class="text-center" style="font-family: Allura">Menu</h2>';
      domString += '<div class="row wrap">';
      menuArray.forEach((item) => {
        domString += '<div class="col-3">';
        domString += '<div id="whole-card-container">';
        domString += `  <div class="card menu-item-card" id="${item.id}">`;
        domString += `    <h5 class="card-header">${item.name}</h5>`;
        domString += '    <div class="card-body">';
        domString += `      <div class="img-holder"><img src="${item.imageUrl}" style="width: 100%"></div>`;
        domString += `      <div class="desc-holder" id="desc-${item.id}"><p class="card-text">${item.description}<br>`;
        domString += `      ${item.price}</p></div>`;
        domString += '    </div>';
        domString += '  </div>';
        domString += '</div>';
        domString += '</div>';
      });
      domString += '</div>';
      utils.printToDom('menu-section', domString);
    })
    .catch((err) => console.error('problem with menuBuilder', err));
  $('body').on('mouseenter', '.menu-item-card', menuHoverEnter);
  $('body').on('mouseleave', '.menu-item-card', menuHoverLeave);
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

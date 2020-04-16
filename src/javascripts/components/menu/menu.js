// import axios from 'axios';
// import apiKeys from '../../helpers/apiKeys.json';
import './menu.scss';
import utils from '../../helpers/utils';
import menuData from '../../helpers/data/menuData';

const menuBuilder = () => {
  menuData.getMenuItems()
    .then((menuArray) => {
      let domString = '';
      domString += '<h2 class="text-center" style="font-family: Allura">Menu</h2>';
      domString += '<div class="row wrap">';
      menuArray.forEach((item) => {
        domString += '<div class="col-4">';
        domString += `  <div class="card menu-item-card" id="${item.id}">`;
        domString += `    <h5 class="card-header">${item.name}</h5>`;
        domString += '    <div class="card-body">';
        domString += `      <p class="card-text">${item.description}</>`;
        domString += '    </div>';
        domString += '  </div>';
        domString += '</div>';
      });
      domString += '</div>';
      domString += '<br>';
      utils.printToDom('menu-section', domString);
    })
    .catch((err) => console.error('problem with menuBuilder', err));
};

const buildMenuSection = () => {
  const domString = '<h2>Menu</h2>';
  utils.printToDom('menu-section', domString);
  $('#home-page').addClass('hide');
  $('#staff-section').addClass('hide');
  $('#reservations-section').addClass('hide');
  $('#menu-section').removeClass('hide');
  $('#ingredients-section').addClass('hide');
};

export default { buildMenuSection, menuBuilder };

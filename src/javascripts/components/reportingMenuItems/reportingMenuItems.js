import chart from '../../helpers/chart';
import ordersData from '../../helpers/data/ordersData';
import menuData from '../../helpers/data/menuData';
import utils from '../../helpers/utils';


const getMenuTopTen = () => {
  $('#most-ordered-section').removeClass('hide');
  $('#least-ordered-section').addClass('hide');
  $('#revenue-reporting-section').addClass('hide');
  $('#ingredient-reporting-section').addClass('hide');
  ordersData.getSingleOrders()
    .then((singleOrders) => {
      menuData.getAllMenuItems()
        .then((menuItems) => {
          // Loop over the Reservations and grab the all the reservations that are equal to the date
          const singleOrderList = singleOrders;
          const listOfMenuObjects = [];
          const listOfMenuItems = [];
          // Then loop over the new reservations and inside that loop filter the orders and push the orders into an array that have the same id as the new reservations
          singleOrderList.forEach((singleOrder) => {
            const menuItemPerOrder = menuItems.filter((menuItem) => menuItem.id === singleOrder.menuItemId);
            listOfMenuObjects.push(menuItemPerOrder);
          });
          listOfMenuObjects.flat().forEach((menuItem) => listOfMenuItems.push(menuItem.name));
          const count = {};
          listOfMenuItems.forEach((i) => {
            count[i] = (count[i] || 0) + 1;
          });
          const menuItemsToArray = Object.entries(count);
          const sortedArray = menuItemsToArray.sort((a, b) => b[1] - a[1]);
          if (sortedArray.length > 10) {
            sortedArray.length = 10;
          }
          chart.chartMakerMenuItems('most-ordered-section', sortedArray);
        });
    });
};

const getMenuBottomTen = () => {
  $('#most-ordered-section').addClass('hide');
  $('#least-ordered-section').removeClass('hide');
  $('#revenue-reporting-section').addClass('hide');
  $('#ingredient-reporting-section').addClass('hide');
  ordersData.getSingleOrders()
    .then((singleOrders) => {
      menuData.getAllMenuItems()
        .then((menuItems) => {
          // Loop over the Reservations and grab the all the reservations that are equal to the date
          const singleOrderList = singleOrders;
          const listOfMenuObjects = [];
          const listOfMenuItems = [];
          // Then loop over the new reservations and inside that loop filter the orders and push the orders into an array that have the same id as the new reservations
          singleOrderList.forEach((singleOrder) => {
            const menuItemPerOrder = menuItems.filter((menuItem) => menuItem.id === singleOrder.menuItemId);
            listOfMenuObjects.push(menuItemPerOrder);
          });
          listOfMenuObjects.flat().forEach((menuItem) => listOfMenuItems.push(menuItem.name));
          const count = {};
          listOfMenuItems.forEach((i) => {
            count[i] = (count[i] || 0) + 1;
          });
          const menuItemsToArray = Object.entries(count);
          const sortedArray = menuItemsToArray.sort((a, b) => a[1] - b[1]);
          if (sortedArray.length > 10) {
            sortedArray.length = 10;
          }
          let domString = '';
          domString += '<div id="least-ordered-section"></div>';
          utils.printToDom('least-ordered-section', domString);
        });
    });
};


const reportingMenuItemsEvents = () => {
  $('body').on('click', '#most-ordered-button', getMenuTopTen);
  $('body').on('click', '#least-ordered-button', getMenuBottomTen);
};

export default {
  getMenuTopTen,
  reportingMenuItemsEvents,
  getMenuBottomTen,
};

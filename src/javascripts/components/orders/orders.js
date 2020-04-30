import reservationData from '../../helpers/data/reservationData';
import ingredientsData from '../../helpers/data/ingredientsData';
import ordersData from '../../helpers/data/ordersData';
import menuData from '../../helpers/data/menuData';
import utils from '../../helpers/utils';

import './orders.scss';

const addToOrder = (e) => {
  const addMenuItemId = e.target.closest('.card').id;
  const reservatoinId = e.target.closest('.card-body').id;

  menuData.getSingleMenuItem(addMenuItemId)
    .then((response) => {
      const menuItem = response.data;

      const newOrder = {
        reservationId: reservatoinId,
        menuItemId: addMenuItemId,
        singleOrderTotal: menuItem.price,
      };

      ordersData.addOrder(newOrder)
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          editOrdersPage();
        })
        .catch((err) => console.error('problem with get single menu item in add to order', err));
    })
    .catch((err) => console.error('problem with get single menu item in add to order', err));
};

const removeFromOrder = (e) => {
  const removeOrderId = e.target.closest('.card').id;
  ordersData.deleteOrder(removeOrderId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      editOrdersPage();
    })
    .catch((err) => console.error('problem with delete order in remove from order', err));
};

const editOrdersPage = () => {
  const reservationId = 'reservation5';
  let domString = '';

  domString += '<strong><h1 id="orders-page-header" class="text-center display-4">Reservation Order</h1></strong>';

  // RESRVATION //
  reservationData.getReservationById(reservationId)
    .then((reservation) => {
      domString += `<h2 id="reservation-orders-page-header" class="text-center mt-4">${reservation.partyName}</h2>`;

      // ALL ORDERS //
      ordersData.getAllOrders()
        .then((orders) => {
          menuData.getAllMenuItems()
            .then((menuItems) => {
              ingredientsData.getIngredients()
                .then()
                .catch((err) => console.error('problem with get ingredients in edit orders page', err));
              const reservationOrders = orders.filter((order) => order.reservationId === reservationId);
              // MENU ARRAY VARIABLES //
              const menuBeverages = menuItems.filter((menuItem) => menuItem.category === 'beverage');
              const menuAppetizers = menuItems.filter((menuItem) => menuItem.category === 'appetizer');
              const menuSalads = menuItems.filter((menuItem) => menuItem.category === 'salad');
              const menuMainDishes = menuItems.filter((menuItem) => menuItem.category === 'main');
              const menuDesserts = menuItems.filter((menuItem) => menuItem.category === 'dessert');

              domString += '<div class="d-flex justify-content-center">';
              domString += '<div id="edit-orders-container" class="col-9">';

              // RESRVATION ORDERS //
              domString += '<h3 id="reservation-orders-page-header" class="mt-4">Order</h3>';
              domString += '<div id="reservation-orders-container" class="row flex-row flex-nowrap m-0 pt-3 pb-3 pl-2 border overflow-auto">';

              reservationOrders.forEach((order) => {
                const orderMenuItem = menuItems.find((menuItem) => menuItem.id === order.menuItemId);
                domString += `<div class="card mr-2 col-3" id="${order.id}">`;
                domString += `<img class="card-img-top" src="${orderMenuItem.imageUrl}" alt="Card image cap">`;
                domString += '<div class="card-body text-center d-flex flex-column">';
                domString += `<h5 class="card-title text-left">${orderMenuItem.name}</h5>`;
                domString += `<p class="card-text text-left">${orderMenuItem.description}</p>`;
                domString += '<button class="btn btn-danger mt-auto remove-from-order-button">Remove</button>';
                domString += '</div>';
                domString += '</div>';
              });

              domString += '</div>';

              // BEVERAGES //
              domString += '<h3 id="reservation-orders-page-header" class="mt-4">Beverages</h3>';
              domString += '<div id="reservation-orders-container" class="row flex-row flex-nowrap m-0 pt-3 pb-3 pl-2 border overflow-auto">';

              menuBeverages.forEach((beverage) => {
                domString += `<div class="card mr-2 col-3" id="${beverage.id}">`;
                domString += `<img class="card-img-top" src="${beverage.imageUrl}" alt="Card image cap">`;
                domString += `<div class="card-body text-center d-flex flex-column" id="${reservationId}">`;
                domString += `<h5 class="card-title text-left">${beverage.name}</h5>`;
                domString += `<p class="card-text text-left">${beverage.description}</p>`;
                domString += '<button class="btn btn-primary mt-auto add-to-order-button">Add To Order</button>';
                domString += '</div>';
                domString += '</div>';
              });

              domString += '</div>';

              // APPETIZERS //
              domString += '<h3 id="reservation-orders-page-header" class="mt-4">Appetizers</h3>';
              domString += '<div id="reservation-orders-container" class="row flex-row flex-nowrap m-0 pt-3 pb-3 pl-2 border overflow-auto">';

              menuAppetizers.forEach((appetizer) => {
                domString += `<div class="card mr-2 col-3" id="${appetizer.id}">`;
                domString += `<img class="card-img-top" src="${appetizer.imageUrl}" alt="Card image cap">`;
                domString += `<div class="card-body text-center d-flex flex-column" id="${reservationId}">`;
                domString += `<h5 class="card-title text-left">${appetizer.name}</h5>`;
                domString += `<p class="card-text text-left">${appetizer.description}</p>`;
                domString += '<button class="btn btn-primary mt-auto add-to-order-button">Add To Order</button>';
                domString += '</div>';
                domString += '</div>';
              });

              domString += '</div>';

              // SALADS //
              domString += '<h3 id="reservation-orders-page-header" class="mt-4">Salads</h3>';
              domString += '<div id="reservation-orders-container" class="row flex-row flex-nowrap m-0 pt-3 pb-3 pl-2 border overflow-auto">';

              menuSalads.forEach((salad) => {
                domString += `<div class="card mr-2 col-3" id="${salad.id}">`;
                domString += `<img class="card-img-top" src="${salad.imageUrl}" alt="Card image cap">`;
                domString += `<div class="card-body text-center d-flex flex-column" id="${reservationId}">`;
                domString += `<h5 class="card-title text-left">${salad.name}</h5>`;
                domString += `<p class="card-text text-left">${salad.description}</p>`;
                domString += '<button class="btn btn-primary mt-auto add-to-order-button">Add To Order</button>';
                domString += '</div>';
                domString += '</div>';
              });

              domString += '</div>';

              // Main Dishes //
              domString += '<h3 id="reservation-orders-page-header" class="mt-4">Main Dishes</h3>';
              domString += '<div id="reservation-orders-container" class="row flex-row flex-nowrap m-0 pt-3 pb-3 pl-2 border overflow-auto">';

              menuMainDishes.forEach((mainDish) => {
                domString += `<div class="card mr-2 col-3" id="${mainDish.id}">`;
                domString += `<img class="card-img-top" src="${mainDish.imageUrl}" alt="Card image cap">`;
                domString += `<div class="card-body text-center d-flex flex-column" id="${reservationId}">`;
                domString += `<h5 class="card-title text-left">${mainDish.name}</h5>`;
                domString += `<p class="card-text text-left">${mainDish.description}</p>`;
                domString += '<button class="btn btn-primary mt-auto add-to-order-button">Add To Order</button>';
                domString += '</div>';
                domString += '</div>';
              });

              domString += '</div>';

              // Desserts //
              domString += '<h3 id="reservation-orders-page-header" class="mt-4">Desserts</h3>';
              domString += '<div id="reservation-orders-container" class="row flex-row flex-nowrap m-0 pt-3 pb-3 pl-2 border overflow-auto">';

              menuDesserts.forEach((dessert) => {
                domString += `<div class="card mr-2 col-3" id="${dessert.id}">`;
                domString += `<img class="card-img-top" src="${dessert.imageUrl}" alt="Card image cap">`;
                domString += `<div class="card-body text-center d-flex flex-column" id="${reservationId}">`;
                domString += `<h5 class="card-title text-left">${dessert.name}</h5>`;
                domString += `<p class="card-text text-left">${dessert.description}</p>`;
                domString += '<button class="btn btn-primary mt-auto add-to-order-button">Add To Order</button>';
                domString += '</div>';
                domString += '</div>';
              });

              domString += '</div>';

              domString += '</div>';
              domString += '</div>';

              utils.printToDom('orders-section', domString);
            })
            .catch((err) => console.error('problem with get all menu items in edit orders page', err));
        })
        .catch((err) => console.error('problem with get orders by reservation id in edit orders page', err));
    })
    .catch((err) => console.error('problem with get reservation by id in edit orders page', err));


  $('#home-page').addClass('hide');
  $('#staff-section-container').addClass('hide');
  $('#reservations-section').addClass('hide');
  $('#menu-section').addClass('hide');
  $('#ingredients-section').addClass('hide');
  $('#orders-section').removeClass('hide');
};

const ordersSectionEvents = () => {
  $('body').on('click', '.add-to-order-button', addToOrder);
  $('body').on('click', '.remove-from-order-button', removeFromOrder);
};

export default { editOrdersPage, ordersSectionEvents };

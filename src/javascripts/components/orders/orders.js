import reservationData from '../../helpers/data/reservationData';
import ingredientsData from '../../helpers/data/ingredientsData';
import ordersData from '../../helpers/data/ordersData';
import menuData from '../../helpers/data/menuData';
import utils from '../../helpers/utils';

import './orders.scss';
import recipeData from '../../helpers/data/recipeData';

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
          editOrdersPage(reservatoinId);
        })
        .catch((err) => console.error('problem with get single menu item in add to order', err));
    })
    .catch((err) => console.error('problem with get single menu item in add to order', err));
};

const removeFromOrder = (e) => {
  const removeOrderId = e.target.closest('.card').id;
  const reservatoinId = e.target.closest('.card-body').id;

  ordersData.deleteOrder(removeOrderId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      editOrdersPage(reservatoinId);
    })
    .catch((err) => console.error('problem with delete order in remove from order', err));
};

const editOrderPageEvent = (e) => {
  const reservationId = e.target.closest('.list-group-item').id;

  // eslint-disable-next-line no-use-before-define
  editOrdersPage(reservationId);
  window.scrollTo(0, 0);
};

const editOrdersPage = (reservationId) => {
  let domString = '';

  // RESRVATION //
  reservationData.getReservationById(reservationId)
    .then((reservation) => {
      domString += `<h2 id="reservation-orders-page-header" class="text-center mt-4">Reservation Order: ${reservation.partyName}</h2>`;
      domString += '<button class="btn btn-dark edit-order-back-btn"><i class="fas fa-arrow-left"></i></button>';

      // ALL ORDERS //
      ordersData.getAllOrders()
        .then((allOrders) => {
          // ALL MENU ITEMS //
          menuData.getAllMenuItems()
            .then((allMenuItems) => {
              // ALL INGREDIENTS //
              ingredientsData.getIngredients()
                .then((allIgredients) => {
                  recipeData.getRecipes()
                    .then((allRecipes) => {
                      // CHECK IF INVENTORY IS SET AT ZERO //
                      const soldOutRecipes = [];
                      const soldOutMenuItems = [];
                      allIgredients.forEach((ingredient) => {
                        if (ingredient.quantity === 0) {
                          allRecipes.forEach((recipe) => {
                            if (recipe.ingredientId === ingredient.id) {
                              soldOutRecipes.push(recipe);
                            }
                          });
                        }
                      });

                      soldOutRecipes.forEach((recipe) => {
                        soldOutMenuItems.push(allMenuItems.find((menuItem) => menuItem.id === recipe.menuItemId));
                        soldOutMenuItems.forEach((menuItem) => {
                          menuData.setIsAvailableToFalse(menuItem.id);
                        });
                      });

                      // ORDERS BY RESERVATION //
                      const reservationOrders = allOrders.filter((order) => order.reservationId === reservationId);

                      // MENU ARRAY VARIABLES //
                      const menuBeverages = allMenuItems.filter((menuItem) => menuItem.category === 'beverage');
                      const menuAppetizers = allMenuItems.filter((menuItem) => menuItem.category === 'appetizer');
                      const menuSalads = allMenuItems.filter((menuItem) => menuItem.category === 'salad');
                      const menuMainDishes = allMenuItems.filter((menuItem) => menuItem.category === 'main');
                      const menuDesserts = allMenuItems.filter((menuItem) => menuItem.category === 'dessert');

                      domString += '<div class="d-flex justify-content-center">';
                      domString += '<div id="edit-orders-container" class="col-9">';

                      // ORDERS //
                      domString += '<h3 id="reservation-orders-page-header" class="mt-4">Order</h3>';
                      domString += '<div id="reservation-orders-container" class="row flex-row flex-nowrap m-0 pt-3 pb-3 pl-2 border overflow-auto">';

                      reservationOrders.forEach((order) => {
                        //  ORDER DATA SETUP //
                        const orderMenuItem = allMenuItems.find((menuItem) => menuItem.id === order.menuItemId);
                        const orderMenuItemRecipes = allRecipes.filter((recipe) => recipe.menuItemId === orderMenuItem.id);
                        const orderMenuItemIngredients = [];
                        orderMenuItemRecipes.forEach((recipe) => {
                          orderMenuItemIngredients.push(allIgredients.find((ingredient) => ingredient.id === recipe.ingredientId));
                        });

                        // ORDER PRINT STATEMENTS //
                        domString += `<div class="card mr-2 col-3" id="${order.id}">`;
                        domString += '<div class="edit-order-img-holder">';
                        domString += `<img class="card-img-top" src="${orderMenuItem.imageUrl}" alt="Card image cap">`;
                        domString += '</div>';
                        domString += `<div class="card-body text-center d-flex flex-column" id="${reservationId}">`;
                        domString += `<h5 class="card-title menu-item-name text-left">${orderMenuItem.name}</h5>`;
                        domString += '<h6 class="card-title text-left mt-auto">Inventory:</h6>';
                        domString += '<div class="menu-item-inventory-list overflow-auto mb-3">';
                        orderMenuItemIngredients.forEach((ingredient) => {
                          if (ingredient === undefined) {
                            console.error('an ingredient from this menu item is missing from data', orderMenuItem);
                          } else {
                            domString += `<p class="card-text text-center m-0">${ingredient.name}</p>`;
                            domString += `<p class="card-text text-center">${ingredient.quantity}</p>`;
                          }
                        });
                        domString += '</div>';
                        domString += '<button class="btn btn-danger mt-auto remove-from-order-button">Remove</button>';
                        domString += '</div>';
                        domString += '</div>';
                      });

                      domString += '</div>';

                      // BEVERAGES //
                      domString += '<h3 id="reservation-orders-page-header" class="mt-4">Beverages</h3>';
                      domString += '<div id="reservation-orders-container" class="row flex-row flex-nowrap m-0 pt-3 pb-3 pl-2 border overflow-auto">';

                      menuBeverages.forEach((beverage) => {
                        //  BEVERAGES DATA SETUP //
                        const beverageMenuItemRecipes = allRecipes.filter((recipe) => recipe.menuItemId === beverage.id);
                        const beverageMenuItemIngredients = [];
                        beverageMenuItemRecipes.forEach((recipe) => {
                          beverageMenuItemIngredients.push(allIgredients.find((ingredient) => ingredient.id === recipe.ingredientId));
                        });

                        // BEVERAGES PRINT STATEMENTS //
                        domString += `<div class="card mr-2 col-3" id="${beverage.id}">`;
                        domString += '<div class="edit-order-img-holder">';
                        domString += `<img class="card-img-top" src="${beverage.imageUrl}" alt="Card image cap">`;
                        domString += '</div>';
                        domString += `<div class="card-body text-center d-flex flex-column" id="${reservationId}">`;
                        domString += `<h5 class="card-title menu-item-name text-left">${beverage.name}</h5>`;
                        domString += '<h6 class="card-title text-left">Inventory:</h6>';
                        domString += '<div class="menu-item-inventory-list overflow-auto mb-3">';
                        beverageMenuItemIngredients.forEach((ingredient) => {
                          if (ingredient === undefined) {
                            console.error('an ingredient from this menu item is missing from data', beverage);
                          } else {
                            domString += `<p class="card-text text-center m-0">${ingredient.name}</p>`;
                            domString += `<p class="card-text text-center ${ingredient.quantity === 0 ? 'text-danger' : ''}">${ingredient.quantity}</p>`;
                          }
                        });
                        domString += '</div>';
                        if (beverage.setIsAvailable === false) {
                          domString += '<button class="btn btn-primary mt-auto add-to-order-button" disabled>SOLD OUT</button>';
                        } else {
                          domString += '<button class="btn btn-primary mt-auto add-to-order-button">Add To Order</button>';
                        }
                        domString += '</div>';
                        domString += '</div>';
                      });

                      domString += '</div>';

                      // APPETIZERS //
                      domString += '<h3 id="reservation-orders-page-header" class="mt-4">Appetizers</h3>';
                      domString += '<div id="reservation-orders-container" class="row flex-row flex-nowrap m-0 pt-3 pb-3 pl-2 border overflow-auto">';

                      menuAppetizers.forEach((appetizer) => {
                        //  APPETIZERS DATA SETUP //
                        const appetizerMenuItemRecipes = allRecipes.filter((recipe) => recipe.menuItemId === appetizer.id);
                        const appetizerMenuItemIngredients = [];
                        appetizerMenuItemRecipes.forEach((recipe) => {
                          appetizerMenuItemIngredients.push(allIgredients.find((ingredient) => ingredient.id === recipe.ingredientId));
                        });

                        // APPETIZERS PRINT STATEMENTS //
                        domString += `<div class="card mr-2 col-3" id="${appetizer.id}">`;
                        domString += '<div class="edit-order-img-holder">';
                        domString += `<img class="card-img-top" src="${appetizer.imageUrl}" alt="Card image cap">`;
                        domString += '</div>';
                        domString += `<div class="card-body text-center d-flex flex-column" id="${reservationId}">`;
                        domString += `<h5 class="card-title menu-item-name text-left">${appetizer.name}</h5>`;
                        domString += '<h6 class="card-title text-left">Inventory:</h6>';
                        domString += '<div class="menu-item-inventory-list overflow-auto mb-3">';
                        appetizerMenuItemIngredients.forEach((ingredient) => {
                          if (ingredient === undefined) {
                            console.error('an ingredient from this menu item is missing from data', appetizer);
                          } else {
                            domString += `<p class="card-text text-center m-0">${ingredient.name}</p>`;
                            domString += `<p class="card-text text-center ${ingredient.quantity === 0 ? 'text-danger' : ''}">${ingredient.quantity}</p>`;
                          }
                        });
                        domString += '</div>';
                        if (appetizer.isAvailable === false) {
                          domString += '<button class="btn btn-danger mt-auto add-to-order-button" disabled>SOLD OUT</button>';
                        } else {
                          domString += '<button class="btn btn-primary mt-auto add-to-order-button">Add To Order</button>';
                        }
                        domString += '</div>';
                        domString += '</div>';
                      });

                      domString += '</div>';

                      // SALADS //
                      domString += '<h3 id="reservation-orders-page-header" class="mt-4">Salads</h3>';
                      domString += '<div id="reservation-orders-container" class="row flex-row flex-nowrap m-0 pt-3 pb-3 pl-2 border overflow-auto">';

                      menuSalads.forEach((salad) => {
                        //  SALADS DATA SETUP //
                        const saladMenuItemRecipes = allRecipes.filter((recipe) => recipe.menuItemId === salad.id);
                        const saladMenuItemIngredients = [];
                        saladMenuItemRecipes.forEach((recipe) => {
                          saladMenuItemIngredients.push(allIgredients.find((ingredient) => ingredient.id === recipe.ingredientId));
                        });

                        // SALADS PRINT STATEMENTS //
                        domString += `<div class="card mr-2 col-3" id="${salad.id}">`;
                        domString += '<div class="edit-order-img-holder">';
                        domString += `<img class="card-img-top" src="${salad.imageUrl}" alt="Card image cap">`;
                        domString += '</div>';
                        domString += `<div class="card-body text-center d-flex flex-column" id="${reservationId}">`;
                        domString += `<h5 class="card-title menu-item-name text-left">${salad.name}</h5>`;
                        domString += '<h6 class="card-title text-left">Inventory:</h6>';
                        domString += '<div class="menu-item-inventory-list overflow-auto mb-3">';
                        saladMenuItemIngredients.forEach((ingredient) => {
                          if (ingredient === undefined) {
                            console.error('an ingredient from this menu item is missing from data', salad);
                          } else {
                            domString += `<p class="card-text text-center m-0">${ingredient.name}</p>`;
                            domString += `<p class="card-text text-center ${ingredient.quantity === 0 ? 'text-danger' : ''}">${ingredient.quantity}</p>`;
                          }
                        });
                        domString += '</div>';
                        if (salad.isAvailable === false) {
                          domString += '<button class="btn btn-danger mt-auto add-to-order-button" disabled>SOLD OUT</button>';
                        } else {
                          domString += '<button class="btn btn-primary mt-auto add-to-order-button">Add To Order</button>';
                        }
                        domString += '</div>';
                        domString += '</div>';
                      });

                      domString += '</div>';

                      // MAIN DISHES //
                      domString += '<h3 id="reservation-orders-page-header" class="mt-4">Main Dishes</h3>';
                      domString += '<div id="reservation-orders-container" class="row flex-row flex-nowrap m-0 pt-3 pb-3 pl-2 border overflow-auto">';

                      menuMainDishes.forEach((mainDish) => {
                        //  MAIN DISHES DATA SETUP //
                        const mainDishMenuItemRecipes = allRecipes.filter((recipe) => recipe.menuItemId === mainDish.id);
                        const mainDishMenuItemIngredients = [];
                        mainDishMenuItemRecipes.forEach((recipe) => {
                          mainDishMenuItemIngredients.push(allIgredients.find((ingredient) => ingredient.id === recipe.ingredientId));
                        });

                        // MAIN DISHES PRINT STATEMENTS //
                        domString += `<div class="card mr-2 col-3" id="${mainDish.id}">`;
                        domString += '<div class="edit-order-img-holder">';
                        domString += `<img class="card-img-top" src="${mainDish.imageUrl}" alt="Card image cap">`;
                        domString += '</div>';
                        domString += `<div class="card-body text-center d-flex flex-column" id="${reservationId}">`;
                        domString += `<h5 class="card-title menu-item-name text-left">${mainDish.name}</h5>`;
                        domString += '<h6 class="card-title text-left">Inventory:</h6>';
                        domString += '<div class="menu-item-inventory-list overflow-auto mb-3">';
                        mainDishMenuItemIngredients.forEach((ingredient) => {
                          if (ingredient === undefined) {
                            console.error('an ingredient from this menu item is missing from data', mainDish);
                          } else {
                            domString += `<p class="card-text text-center m-0">${ingredient.name}</p>`;
                            domString += `<p class="card-text text-center ${ingredient.quantity === 0 ? 'text-danger' : ''}">${ingredient.quantity}</p>`;
                          }
                        });
                        domString += '</div>';
                        if (mainDish.isAvailable === false) {
                          domString += '<button class="btn btn-danger mt-auto add-to-order-button" disabled>SOLD OUT</button>';
                        } else {
                          domString += '<button class="btn btn-primary mt-auto add-to-order-button">Add To Order</button>';
                        }
                        domString += '</div>';
                        domString += '</div>';
                      });

                      domString += '</div>';

                      // DESSERTS //
                      domString += '<h3 id="reservation-orders-page-header" class="mt-4">Desserts</h3>';
                      domString += '<div id="reservation-orders-container" class="row flex-row flex-nowrap m-0 pt-3 pb-3 pl-2 border overflow-auto">';

                      menuDesserts.forEach((dessert) => {
                        //  DESSERTS DATA SETUP //
                        const dessertMenuItemRecipes = allRecipes.filter((recipe) => recipe.menuItemId === dessert.id);
                        const dessertMenuItemIngredients = [];
                        dessertMenuItemRecipes.forEach((recipe) => {
                          dessertMenuItemIngredients.push(allIgredients.find((ingredient) => ingredient.id === recipe.ingredientId));
                        });

                        // DESSERTS PRINT STATEMENTS //
                        domString += `<div class="card mr-2 col-3" id="${dessert.id}">`;
                        domString += '<div class="edit-order-img-holder">';
                        domString += `<img class="card-img-top" src="${dessert.imageUrl}" alt="Card image cap">`;
                        domString += '</div>';
                        domString += `<div class="card-body text-center d-flex flex-column" id="${reservationId}">`;
                        domString += `<h5 class="card-title menu-item-name text-left">${dessert.name}</h5>`;
                        domString += '<h6 class="card-title text-left">Inventory:</h6>';
                        domString += '<div class="menu-item-inventory-list overflow-auto mb-3">';
                        dessertMenuItemIngredients.forEach((ingredient) => {
                          if (ingredient === undefined) {
                            console.error('an ingredient from this menu item is missing from data', dessert);
                          } else {
                            domString += `<p class="card-text text-center m-0">${ingredient.name}</p>`;
                            domString += `<p class="card-text text-center ${ingredient.quantity === 0 ? 'text-danger' : ''}">${ingredient.quantity}</p>`;
                          }
                        });
                        domString += '</div>';
                        if (dessert.isAvailable === false) {
                          domString += '<button class="btn btn-danger mt-auto add-to-order-button" disabled>SOLD OUT</button>';
                        } else {
                          domString += '<button class="btn btn-primary mt-auto add-to-order-button">Add To Order</button>';
                        }
                        domString += '</div>';
                        domString += '</div>';
                      });

                      domString += '</div>';

                      domString += '</div>';
                      domString += '</div>';

                      utils.printToDom('orders-section', domString);
                    })
                    .catch((err) => console.error('problem with get recipes in edit orders page', err));
                })
                .catch((err) => console.error('problem with get ingredients in edit orders page', err));
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
  $('#filtered-reservations-container').addClass('hide');
  $('#reporting-section').addClass('hide');
  $('#orders-section').removeClass('hide');
};

const ordersSectionEvents = () => {
  $('body').on('click', '.edit-order-btn', editOrderPageEvent);
  $('body').on('click', '.add-to-order-button', addToOrder);
  $('body').on('click', '.remove-from-order-button', removeFromOrder);
};

export default { editOrdersPage, ordersSectionEvents, editOrderPageEvent };

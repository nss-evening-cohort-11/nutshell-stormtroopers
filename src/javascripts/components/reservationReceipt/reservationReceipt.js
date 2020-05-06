import ordersData from '../../helpers/data/ordersData';
import menuData from '../../helpers/data/menuData';
import utils from '../../helpers/utils';

const buildReservationReciept = (reservationId) => {
  let domString = '';

  domString += '<div class="d-flex justify-content-center mb-3">';
  domString += '<div class="card" style="width: 18rem;">';
  domString += '<div class="card-body">';
  domString += '<h5 class="card-title text-center border-bottom pb-2">Reservation Receipt</h5>';

  ordersData.getAllOrders()
    .then((orders) => {
      const reservationOrders = orders.filter((order) => order.reservationId === reservationId);

      menuData.getAllMenuItems()
        .then((menuItems) => {
          const orderMenuItems = [];

          reservationOrders.forEach((singleOrder) => {
            const menuItemPerOrder = menuItems.filter((menuItem) => menuItem.id === singleOrder.menuItemId);

            orderMenuItems.push(menuItemPerOrder);
          });

          let receiptTotal = 0;

          domString += '<div class="recept-menu-items mb-2 pb-2">';
          orderMenuItems.flat().forEach((menuItem) => {
            domString += `<p class="card-text text-inline">${menuItem.name} <span class="float-right">$${menuItem.price}</span></p>`;

            receiptTotal += menuItem.price;
          });
          domString += '</div>';

          domString += `<p class="card-text text-inline font-weight-bold border-top pt-2">Total: <span class="float-right">$${receiptTotal}</span></p>`;
          domString += '</div>';
          domString += '</div>';
          domString += '</div>';

          utils.printToDom('reservation-receipt', domString);
        })
        .catch((err) => console.error('problem with get all menu items in build reservation receipt', err));
    })
    .catch();
};

export default { buildReservationReciept };

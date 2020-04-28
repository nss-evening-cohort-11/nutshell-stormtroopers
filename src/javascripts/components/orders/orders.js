import reservationData from '../../helpers/data/reservationData';
import ordersData from '../../helpers/data/ordersData';
import utils from '../../helpers/utils';

import './orders.scss';

const editOrdersPage = () => {
  const reservationId = 'reservation1';
  let domString = '';

  domString += '<strong><h1 id="orders-page-header" class="text-center display-4">Reservation Orders</h1></strong>';

  // RESRVATION //
  reservationData.getReservationById(reservationId)
    .then((reservation) => {
      domString += `<h2 id="orders-page-reservation-header" class="text-center mt-4">${reservation.partyName}</h2>`;

      // ALL ORDERS //
      ordersData.getAllOrders()
        .then((orders) => {
          const reservationOrders = orders.filter((order) => order.reservationId === reservationId);
          domString += '<div class="d-flex justify-content-center">';

          domString += '<div id="edit-orders-container" class="col-9">';

          domString += '<h3 id="orders-page-reservation-header" class="mt-4">Orders</h3>';
          domString += '<div id="reservation-orders-container" class="d-flex flex-row border p-4">';


          // RESRVATION ORDERS //
          reservationOrders.forEach((order) => {
            domString += '<div class="card mr-2 p-3">';
            domString += `<div class="card-title">${order.menuItemId}</div>`;
            domString += `<p class="card-text">${order.menuItemId}</p>`;
            domString += '</div>';
          });

          domString += '</div>';
          domString += '</div>';
          domString += '</div>';

          utils.printToDom('orders-section', domString);
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

export default { editOrdersPage };

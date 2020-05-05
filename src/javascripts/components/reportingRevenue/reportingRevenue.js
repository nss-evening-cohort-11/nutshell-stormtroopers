import moment from 'moment';
import utils from '../../helpers/utils';
import reservationData from '../../helpers/data/reservationData';
import ordersData from '../../helpers/data/ordersData';


const showReportingTab = () => {
  let domString = '';
  domString += '<button id="reporting-button" class="btn btn-white nav-link">Reporting</button>';
  utils.printToDom('reporting-tab', domString);
};

const removeReportingTab = () => {
  const domString = '';
  utils.printToDom('reporting-tab', domString);
};
const getResevationsByDate = () => {
  $('#most-ordered-section').addClass('hide');
  $('#least-ordered-section').addClass('hide');
  $('#revenue-reporting-section').removeClass('hide');
  $('#ingredient-reporting-section').addClass('hide');
  if ($('#date-div-range').is(':visible') === true) {
    // Gets the first input put in by the user
    const date1 = $('#date1').val();
    // Gets the second input put in by the user
    const date2 = $('#date2').val();
    // Takes those inputs and turns them into the moment format
    const modifiedDate1 = moment(date1, 'YYYY/MM/DD').format('YYYY/MM/DD');
    const modifiedDate2 = moment(date2, 'YYYY/MM/DD').format('YYYY/MM/DD');
    reservationData.getReservations()
      .then((reservations) => {
        ordersData.getSingleOrders()
          .then((singleOrders) => {
            // Loop over the Reservations and grab the reservations with a date inbetween the two dates
            const reservationByDate = reservations.filter((reservation) => moment(reservation.date, 'YYYY/MM/DD').isBetween(modifiedDate1, modifiedDate2, null, '[]'));
            const reservationOrdersByDate = [];
            // Then loop over the new reservations and inside that loop filter the orders and push the orders into an array that have the same id as the new reservations
            reservationByDate.forEach((reservation) => {
              const singleOrderByDate = singleOrders.filter((orders) => orders.reservationId === reservation.id);
              reservationOrdersByDate.push(singleOrderByDate);
            });
            let sumSingleOrderTotal = 0;
            // Loop over the single orders and add up there totals
            reservationOrdersByDate.flat().forEach((orderTotal) => {
              sumSingleOrderTotal = orderTotal.singleOrderTotal + sumSingleOrderTotal;
            });
            // output the sum of the orders into the div
            let domString = '';
            domString += 'The company made ';
            domString += '$';
            domString += sumSingleOrderTotal;
            domString += ' between ';
            domString += modifiedDate1;
            domString += ' and ';
            domString += modifiedDate2;
            utils.printToDom('revenue-reporting-section', domString);
          });
      });
  } else if ($('#date-div-single').is(':visible') === true) {
    // Gets the input put in by the user
    const date3 = $('#date3').val();
    // Takes those inputs and turns them into the moment format
    const modifiedDate3 = moment(date3, 'YYYY/MM/DD').format('YYYY/MM/DD');
    reservationData.getReservations()
      .then((reservations) => {
        ordersData.getSingleOrders()
          .then((singleOrders) => {
            // Loop over the Reservations and grab the all the reservations that are equal to the date
            const reservationByDate = reservations.filter((reservation) => moment(reservation.date).format('YYYY/MM/DD') === modifiedDate3);
            const reservationOrdersByDate = [];
            // Then loop over the new reservations and inside that loop filter the orders and push the orders into an array that have the same id as the new reservations
            reservationByDate.forEach((reservation) => {
              const singleOrderByDate = singleOrders.filter((orders) => orders.reservationId === reservation.id);
              reservationOrdersByDate.push(singleOrderByDate);
            });
            let sumSingleOrderTotal = 0;
            // Loop over the single orders and add up there totals
            reservationOrdersByDate.flat().forEach((orderTotal) => {
              sumSingleOrderTotal = orderTotal.singleOrderTotal + sumSingleOrderTotal;
            });
            // output the sum of the orders into the div
            let domString = '';
            domString += 'The company made ';
            domString += '$';
            domString += sumSingleOrderTotal;
            domString += ' on ';
            domString += modifiedDate3;
            utils.printToDom('revenue-reporting-section', domString);
          });
      });
  }
};

const showDateRangeForm = () => {
  $('#date-div-range').removeClass('hide');
  $('#date-div-single').addClass('hide');
};

const showDateSingleForm = () => {
  $('#date-div-range').addClass('hide');
  $('#date-div-single').removeClass('hide');
};

const buildReportingPage = () => {
  let domString = '';
  domString += '<h1 class="text-center my-4">Reporting</h1>';
  domString += '<div id="date-buttons-div" class="text-center mb-2">';
  domString += '<button id="date-single" class="btn btn-primary mx-2">Single Date</button>';
  domString += '<button id="date-range" class="btn btn-primary mx-2">Date Range</button>';
  domString += '</div>';
  domString += '<div id="date-div-range" class="container my-3">';
  domString += '<div class="row justify-content-center">';
  domString += '<form class=" col-3 ">';
  domString += '<div class="form-group">';
  domString += '<label for="date1">Enter Start Date: </label>';
  domString += '<input type="text" class="form-control" id="date1" aria-describedby="firstdate" placeholder="2019-4-26">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="date2">Enter End Date: </label>';
  domString += '<input type="text" class="form-control" id="date2" aria-describedby="seconddate" placeholder="2019-4-28">';
  domString += '</div>';
  domString += '</form>';
  domString += '</div>';
  domString += '</div>';
  domString += '<div id="date-div-single" class="container hide my-3">';
  domString += '<div class="row justify-content-center">';
  domString += '<form class=" col-3">';
  domString += '<div class="form-group">';
  domString += '<label for="date3">Enter Date: </label>';
  domString += '<input type="text" class="form-control" id="date3" aria-describedby="thirddate" placeholder="2019-4-28">';
  domString += '</div>';
  domString += '</form>';
  domString += '</div>';
  domString += '</div>';
  domString += '<div id="statistic-buttons-div" class = "text-center my-3 mb-4 ">';
  domString += '<button id="revenue-button" class="btn btn-success mx-2">Revenue</button>';
  domString += '<button id="ingredient-reporting-button" class="btn btn-primary mx-2">Ingredients</button>';
  domString += '<button id="most-ordered-button" class="btn btn-success mx-2">Most Ordered Menu Items</button>';
  domString += '<button id="least-ordered-button" class="btn btn-primary mx-2">Least Ordered Menu Items</button>';
  domString += '</div>';
  domString += '<div id="ingredient-reporting-section"></div>';
  domString += '<div id="revenue-reporting-section" class=" text-center border border-success"></div>';
  domString += '<div id="most-ordered-section" class="text-center"></div>';
  domString += '<div id="least-ordered-section" class="text-center"></div>';

  utils.printToDom('reporting-section', domString);
  $(document).ready(() => {
    $('#home-page').addClass('hide');
    $('#staff-section-container').addClass('hide');
    $('#reservations-section').addClass('hide');
    $('#menu-section').addClass('hide');
    $('#ingredients-section').addClass('hide');
    $('#orders-section').addClass('hide');
    $('#reporting-section').removeClass('hide');
    $('#reservations-portal-section').addClass('hide');
  });
};

const revenueEvents = () => {
  $('body').on('click', '#revenue-button', getResevationsByDate);
  $('body').on('click', '#date-range', showDateRangeForm);
  $('body').on('click', '#date-single', showDateSingleForm);
};


export default {
  showReportingTab,
  removeReportingTab,
  buildReportingPage,
  revenueEvents,
};

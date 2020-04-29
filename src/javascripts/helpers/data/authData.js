import firebase from 'firebase/app';
import 'firebase/auth';
import ingredients from '../../components/ingredients/ingredients';
import staff from '../../components/staff/staff';
import reservations from '../../components/reservations/reservations';
import reportingRevenue from '../../components/reportingRevenue/reportingRevenue';

const loginButton = $('#login-button');
const logoutButton = $('#navbar-logout-button');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person logged in
      loginButton.addClass('hide');
      logoutButton.removeClass('hide');
      ingredients.loggedInIngredients();
      ingredients.ingredientEvents();
      ingredients.modalEvents();
      staff.staffSectionEvents();
      reportingRevenue.revenueEvents();
      reservations.reservationSectionEvents();
      reportingRevenue.showReportingTab();
    } else {
      // person not logged in
      logoutButton.addClass('hide');
      loginButton.removeClass('hide');
      ingredients.loggedOutIngredients();
      staff.removeStaffSectionEvents();
      reservations.removeReservationSectionEvents();
      reportingRevenue.removeReportingTab();
    }
  });
};

const logoutEvent = () => {
  $('#navbar-logout-button').click((e) => {
    e.preventDefault();
    firebase.auth().signOut();
  });
};

export default {
  checkLoginStatus,
  logoutEvent,
};

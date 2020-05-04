import firebase from 'firebase/app';
import 'firebase/auth';
import ingredients from '../../components/ingredients/ingredients';
import staff from '../../components/staff/staff';
import reservations from '../../components/reservations/reservations';
import reservationsPortal from '../../components/reservationsPortal/reservationsPortal';
import reportingRevenue from '../../components/reportingRevenue/reportingRevenue';
import reportingIngredient from '../../components/ingredients/ingredientReporting';
import reportingMenuItems from '../../components/reportingMenuItems/reportingMenuItems';

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
      reportingIngredient.ingredientReportEvents();
      reportingRevenue.revenueEvents();
      reportingMenuItems.reportingMenuItemsEvents();
      reservations.reservationSectionEvents();
      reservationsPortal.reservationPortalEvents();
      reportingRevenue.showReportingTab();
    } else {
      // person not logged in
      logoutButton.addClass('hide');
      loginButton.removeClass('hide');
      ingredients.loggedOutIngredients();
      staff.removeStaffSectionEvents();
      reservations.removeReservationSectionEvents();
      reservationsPortal.removeReservationPortalEvents();
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

import '../styles/main.scss';
import 'bootstrap';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import auth from './auth/auth';

import staff from './components/staff/staff';
import reservations from './components/reservations/reservations';
import menu from './components/menu/menu';
import ingredients from './components/ingredients/ingredients';

const navbarClickEvents = () => {
  $('#staff-button').click(staff.buildStaffSection);
  $('#reservations-button').click(reservations.buildReservationsSection);
  $('#menu-button').click(menu.buildMenuSection);
  $('#ingredients-button').click(ingredients.buildIngredientsSection);
};

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  $('.login-button').click(auth.signMeIn());
  navbarClickEvents();
};

init();

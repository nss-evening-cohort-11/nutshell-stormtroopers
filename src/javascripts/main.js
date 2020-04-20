import '../styles/main.scss';
import 'bootstrap';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import auth from './auth/auth';

import home from './components/home/home';
import staff from './components/staff/staff';
import reservations from './components/reservations/reservations';
import menu from './components/menu/menu';
import ingredients from './components/ingredients/ingredients';
import authData from './helpers/data/authData';

const navbarClickEvents = () => {
  $(document).ready(() => {
    $('#brand-logo').click(home.showHomePage);
    $('#staff-button').click(staff.staffInit);
    $('#reservations-button').click(reservations.buildReservationsSection);
    $('#menu-button').click(menu.buildMenuSection);
    $('#ingredients-button').click(ingredients.buildIngredientsSection);
  });
};

const init = () => {
  $(document).ready(() => {
    $('#login-button').click(auth.signMeIn);
    $('.nav-item').button('toggle');
  });
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbarClickEvents();
  authData.checkLoginStatus();
  authData.logoutEvent();
};

init();

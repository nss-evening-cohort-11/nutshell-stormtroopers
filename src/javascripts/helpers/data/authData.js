import firebase from 'firebase/app';
import 'firebase/auth';

import staff from '../../components/staff/staff';

const loginButton = $('#login-button');
const logoutButton = $('#navbar-logout-button');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person logged in
      loginButton.addClass('hide');
      logoutButton.removeClass('hide');
      staff.staffSectionEvents();
    } else {
      // person not logged in
      logoutButton.addClass('hide');
      loginButton.removeClass('hide');
      staff.removeStaffSectionEvents();
    }
  });
};

const logoutEvent = () => {
  $('#navbar-logout-button').click((e) => {
    e.preventDefault();
    firebase.auth().signOut();
  });
};

export default { checkLoginStatus, logoutEvent };

import firebase from 'firebase/app';
import 'firebase/auth';

const loginButton = $('.login-button');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person logged in
      loginButton.addClass('hide');
    } else {
      // person not logged in
    }
  });
};

export default { checkLoginStatus };

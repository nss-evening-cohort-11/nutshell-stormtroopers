import '../styles/main.scss';
import 'bootstrap';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import auth from './auth/auth';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  $('.login-button').click(auth.signMeIn());
};

init();

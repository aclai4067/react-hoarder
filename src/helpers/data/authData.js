import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../apiKeys.json';

const firebaseApp = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig.firebaseKeys);
  }
};

const getUid = () => firebase.auth().currentUser.uid;

export default { firebaseApp, getUid };

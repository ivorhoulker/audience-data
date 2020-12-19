import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCeI1M5PIyWg4uRuU1F2ubQvfNXt-gsDvo",
  authDomain: "rooftop-audience-data.firebaseapp.com",
  projectId: "rooftop-audience-data",
  storageBucket: "rooftop-audience-data.appspot.com",
  messagingSenderId: "641794281450",
  appId: "1:641794281450:web:1088f70853ab17a4f52c93",
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();
export { firebase, firestore, auth };

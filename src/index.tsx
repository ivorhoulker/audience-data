import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./app/ReduxStore";
import { Provider } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import "firebase/functions"; // <- needed if using httpsCallable

import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebaseConfig from "./firebase-config.json";
import { createFirestoreInstance } from "redux-firestore";

firebase.initializeApp(firebaseConfig);
firebase.firestore(); // <- needed if using firestore
firebase.functions(); // <- needed if using httpsCallable
firebase.auth().onAuthStateChanged(async (user) => {
  if (!user) {
    await firebase.auth().signInAnonymously();
  }
});
const rrfConfig = {
  // userProfile: "users",
  // useFirestoreForProfile: false, // Firestore for Profile instead of Realtime DB
  // enableClaims: false, // Get custom claims along with the profile
};
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

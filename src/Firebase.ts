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
firebase
  .firestore()
  .enablePersistence()
  .catch(function (err) {
    if (err.code === "failed-precondition") {
      console.warn(
        "FIRESTORE PERSIST: Multiple tabs open, persistence can only be enabled in one tab at a a time."
      );
    } else if (err.code === "unimplemented") {
      console.warn(
        "FIRESTORE PERSIST: The current browser does not support all of thefeatures required to enable persistence..."
      );
    }
  });
const auth = firebase.auth();
function timestamp() {
  return firebase.firestore.FieldValue.serverTimestamp();
}
export { firebase, firestore, auth, timestamp };

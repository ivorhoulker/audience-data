// import firebase from "firebase/app";
// import firebaseConfig from "./firebase.config.json";
// firebase.initializeApp(firebaseConfig);
// const firestore = firebase.firestore();
// firebase
//   .firestore()
//   .enablePersistence()
//   .catch(function (err) {
//     if (err.code === "failed-precondition") {
//       console.warn(
//         "FIRESTORE PERSIST: Multiple tabs open, persistence can only be enabled in one tab at a a time."
//       );
//     } else if (err.code === "unimplemented") {
//       console.warn(
//         "FIRESTORE PERSIST: The current browser does not support all of thefeatures required to enable persistence..."
//       );
//     }
//   });
// const auth = firebase.auth();
// function timestamp() {
//   return firebase.firestore.FieldValue.serverTimestamp();
// }
// export { firebase, firestore, auth, timestamp };

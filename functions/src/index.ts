import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.region("asia-east2");
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

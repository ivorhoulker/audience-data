import * as functions from "firebase-functions";
import * as express from "express";
const cors = require("cors");
const app = express();
const router = express.Router();

router.get("/results", (_req, res) => {
  res.send(
    JSON.stringify({
      english: "test",
      category: "economics",
      subcategory: "control",
      strength: 1,
      multiplier: 2,
    })
  );
});
app.use(cors());
app.use("/api", router);

exports.api = functions.https.onRequest(app);

// exports.fns = functions.https.onRequest(app);
// export const helloWorld = functions.https.onRequest((req, res) => {
//   if (req.method === "PUT") {
//     return res.status(403).send("Forbidden!");
//   }
//   functions.logger.info("Hello logs!", { structuredData: true });
//   return cors(req, res, () => {
//     // [END usingMiddleware]
//     // Reading date format from URL query parameter.
//     // [START readQueryParam]
//     // let format = req.query.format;
//     // // [END readQueryParam]
//     // // Reading date format from request body query parameter
//     // if (!format) {
//     //   // [START readBodyParam]
//     //   format = req.body.format;
//     //   // [END readBodyParam]
//     // }
//     // [START sendResponse]

//     res.status(200).send("THIS IS MY RESPONSE, DUDE");
// });

import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  firebaseReducer,
  getFirebase,
  actionTypes as rrfActionTypes,
} from "react-redux-firebase";
import { firestoreReducer, constants as rfConstants } from "redux-firestore";
import audioSlice from "../audio/audioSlice";

const extraArgument = {
  getFirebase,
};
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        // just ignore every redux-firebase and react-redux-firebase action type
        ...Object.keys(rfConstants.actionTypes).map(
          (type) => `${rfConstants.actionsPrefix}/${type}`
        ),
        ...Object.keys(rrfActionTypes).map(
          (type) => `@@reactReduxFirebase/${type}`
        ),
      ],
      ignoredPaths: ["firebase", "firestore"],
    },
    thunk: {
      extraArgument,
    },
  }),
];
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  audio: audioSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});

// if (process.env.NODE_ENV === "development" && module.hot) {
//   module.hot.accept("./rootReducer", () => {
//     const newRootReducer = require("./rootReducer").default;
//     store.replaceReducer(newRootReducer);
//   });
// }

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

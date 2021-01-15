import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  FirebaseReducer,
  firebaseReducer,
  getFirebase,
  actionTypes as rrfActionTypes,
} from "react-redux-firebase";
import { firestoreReducer, constants as rfConstants } from "redux-firestore";
import { CustomFirestoreReducer } from "../types/CustomFirestoreReducer";
import { FirebaseSchema } from "../types/FirebaseSchema";
import { FirestoreSchema } from "../types/FirestoreSchema";
import { Profile } from "../types/Profile";
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
export const store = configureStore({
  reducer: {
    firebase: firebaseReducer,
    firestore: firestoreReducer,
  },
  middleware,
});

// if (process.env.NODE_ENV === "development" && module.hot) {
//   module.hot.accept("./rootReducer", () => {
//     const newRootReducer = require("./rootReducer").default;
//     store.replaceReducer(newRootReducer);
//   });
// }

export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
export interface RootState {
  firebase: FirebaseReducer.Reducer<Profile, FirebaseSchema>;
  firestore: CustomFirestoreReducer<FirestoreSchema>;
}
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

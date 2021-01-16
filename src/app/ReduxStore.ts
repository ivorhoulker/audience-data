import { AudioState } from "./../audio/audioSlice";
import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  FirebaseReducer,
  firebaseReducer,
  getFirebase,
  actionTypes as rrfActionTypes,
  FirestoreReducer,
} from "react-redux-firebase";
import { firestoreReducer, constants as rfConstants } from "redux-firestore";
import { CustomFirestoreReducer } from "../types/CustomFirestoreReducer";
import { FirebaseSchema } from "../types/FirebaseSchema";
import { FirestoreSchema } from "../types/FirestoreSchema";
import { Profile } from "../types/Profile";
import audioSlice from "../audio/audioSlice";
import { Reducer } from "react";
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
// export interface ApplicationState {
//   firebase: FirebaseReducer.Reducer<Profile, FirebaseSchema>;
//   firestore: CustomFirestoreReducer<FirestoreSchema>;
//   audio: typeof audioSlice;
// }
// const recducer: ApplicationState = {
//   firebase: firebaseReducer as FirebaseReducer.Reducer<FirebaseSchema>,
//   firestore: firestoreReducer as FirestoreReducer.Reducer<FirestoreSchema>,
//   audio: audioSlice,
// };
// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  audio: audioSlice.reducer,
});

// Create store with reducers and initial state
// const initialState = {};

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

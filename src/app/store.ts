import { Question } from "./../types/Question";
import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  Data,
  Dictionary,
  FirebaseReducer,
  firebaseReducer,
  Listeners,
  ReduxFirestoreQuerySetting,
  getFirebase,
  actionTypes as rrfActionTypes,
} from "react-redux-firebase";
import { firestoreReducer, constants as rfConstants } from "redux-firestore";
import Answer from "../types/Answer";
// Optional: If you use the user profile option

interface Profile {
  // name: string;
  // email: string;
  uid: string;
}

export interface User {
  name: string;
  id: string;
}
// This will give you type-checking for state.firebase.data.todos and state.firebase.ordered.todos
interface FirestoreSchema {
  questions: Question[];
  answers: Answer[];
  users: User[];
}
interface FirebaseSchema {
  auth: { uid: string };
}

export interface CustomFirestoreReducer<
  Schema extends Record<string, any> = {}
> {
  composite?: Data<any | Dictionary<any>>;
  data: { [T in keyof Schema]: Record<string, Schema[T]> };
  errors: {
    allIds: string[];
    byQuery: any[];
  };
  listeners: Listeners;
  ordered: {
    [T in keyof Schema]: Array<{ key: string; value: Schema[T] }>;
  };
  queries: Data<ReduxFirestoreQuerySetting & (Dictionary<any> | any)>;
  status: {
    requested: Dictionary<boolean>;
    requesting: Dictionary<boolean>;
    timestamps: Dictionary<number>;
  };
}
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

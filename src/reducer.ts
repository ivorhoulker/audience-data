import { combineReducers } from "redux";
import { firestoreReducer as firebase } from "react-redux-firebase";

const rootReducer = combineReducers({
  firebase,
});

export default rootReducer;

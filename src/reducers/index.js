import alertReducer from "./alert";
import authenticationReducer from "./authentication";
import businessReducer from "./business";
import signedInReducer from "./signedIn";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  alert: alertReducer,
  auth: authenticationReducer,
  business: businessReducer,
  isSignedIn: signedInReducer,
});

export default allReducers;

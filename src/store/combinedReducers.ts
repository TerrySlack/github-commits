import { combineReducers } from "redux";

// Import Reducers
import { Commonreducer } from "Common/Redux";

export default combineReducers({
  common: Commonreducer,
});

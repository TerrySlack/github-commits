import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// API requests
import { getCommits } from "Utils/ocktokit";
// Normally use this if there were multiple reducers.
import reducers from "./combinedReducers";

export const setupStore = () =>
  createStore(
    reducers,
    applyMiddleware(thunk.withExtraArgument({ getCommits }))
  );

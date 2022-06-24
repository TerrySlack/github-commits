import React from "react";
import { Provider } from "react-redux";

import "./App.css";
import { AppRoutes } from "../routes";
import { setupStore } from "../store";

// Create the store
const store = setupStore();

//For Cypress tesing
if (window["Cypress"]) {
  window["store"] = store;
}

export const App = () => (
  <Provider store={store}>
    <AppRoutes />
  </Provider>
);

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import App from "./App";

import "./index.css";

const target = document.querySelector("#root");
const root = createRoot(target);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <App />
      </div>
    </BrowserRouter>
  </Provider>
);

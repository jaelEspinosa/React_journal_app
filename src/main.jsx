import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";


import "./styles.css";
import JournalApp from "./JournalApp";
import { Provider } from "react-redux";
import { store } from "./store";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={ store }>
      <Router>
        <JournalApp />
      </Router>
    </Provider>
  </React.StrictMode>
);

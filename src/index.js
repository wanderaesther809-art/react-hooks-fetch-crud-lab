// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { worker } from "./mocks/browser";

// Start MSW only in development mode
if (process.env.NODE_ENV === "development") {
  worker.start();
}

ReactDOM.render(<App />, document.getElementById("root"));

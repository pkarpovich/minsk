import React from "react";
import ReactDOM from "react-dom";
import { css } from "@linaria/core";
import "reset-css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

export const globals = css`
  :global() {
    div#root {
      width: 100vw;
      height: 100vh;
    }
  }
`;

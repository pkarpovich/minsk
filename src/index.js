import { lazy, Suspense, StrictMode } from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Router } from "wouter";
import { css } from "@linaria/core";
import "reset-css";

import { Routes } from "constants/routes";
import { useBasepathLocation } from "./hooks/useBasepathLocation";

import Loading from "pages/loading";
const Home = lazy(() => import("pages/home"));
const Gallery = lazy(() => import("pages/gallery"));

ReactDOM.render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <Router hook={useBasepathLocation}>
        <Switch>
          <Route path={Routes.HOME} component={Home} />
          <Route path={Routes.GALLERY} component={Gallery} />
        </Switch>
      </Router>
    </Suspense>
  </StrictMode>,
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

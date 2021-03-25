import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";

import { Routes } from "constants/routes";

import Loading from "pages/loading";
const Home = lazy(() => import("pages/home"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path={Routes.HOME} component={Home} />
      </Switch>
    </Suspense>
  );
}

export default App;

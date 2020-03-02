import React from "react";
import { Switch, Route } from "react-router-dom";

import { PrivateRoute } from "./components/atoms/PrivateRoute";
import { HomePage } from "./components/pages/HomePage";
import { SignInPage } from "./components/pages/SignInPage";
import { RegisterPage } from "./components/pages/RegisterPage";

import TestingPage from "./components/pages/TestingPage";

export const AppRoutes = () => (
  <Switch>
    <Route path="/sign-in" exact component={SignInPage} />
    <Route path="/register" exact component={RegisterPage} />
    <Route path="/testing" exact component={TestingPage} />
    <Switch>
      <PrivateRoute path="/" exact component={HomePage} />
      <PrivateRoute path="*" component={HomePage} />
    </Switch>
  </Switch>
);

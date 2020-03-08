import React from "react";
import { Switch } from "react-router-dom";

import { PageWrapper } from "./components/organisms/PageWrapper";
import { PublicRoute } from "./components/templates/PublicRoute";
import { PrivateRoute } from "./components/templates/PrivateRoute";
import { HomePage } from "./components/pages/HomePage";
import { SignInPage } from "./components/pages/SignInPage";
import { RegisterPage } from "./components/pages/RegisterPage";

import TestingPage from "./components/pages/TestingPage";

export const AppRoutes = () => (
  <Switch>
    <PublicRoute path="/sign-in" exact component={SignInPage} />
    <PublicRoute path="/register" exact component={RegisterPage} />
    <PageWrapper>
      <Switch>
        <PrivateRoute path="/" exact component={HomePage} />
        <PrivateRoute path="/testing" exact component={TestingPage} />
        <PrivateRoute path="*" component={HomePage} />
      </Switch>
    </PageWrapper>
  </Switch>
);

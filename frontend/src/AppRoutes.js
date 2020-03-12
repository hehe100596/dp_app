import React from "react";
import { Switch } from "react-router-dom";

import { PublicRoute } from "./components/atoms/PublicRoute";
import { PrivateRoute } from "./components/atoms/PrivateRoute";
import { PageWrapper } from "./components/organisms/PageWrapper";
import { HomePage } from "./components/pages/HomePage";
import { SignInPage } from "./components/pages/SignInPage";
import { RegisterPage } from "./components/pages/RegisterPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { CoursesPage } from "./components/pages/CoursesPage";

import TestingPage from "./components/pages/TestingPage";

export const AppRoutes = () => (
  <Switch>
    <PublicRoute path="/sign-in" exact component={SignInPage} />
    <PublicRoute path="/register" exact component={RegisterPage} />
    <PageWrapper>
      <Switch>
        <PrivateRoute path="/profile" exact component={ProfilePage} />
        <PrivateRoute path="/courses" exact component={CoursesPage} />
        <PrivateRoute path="/testing" exact component={TestingPage} />
        <PrivateRoute path="*" component={HomePage} />
      </Switch>
    </PageWrapper>
  </Switch>
);

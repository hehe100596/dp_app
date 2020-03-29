import React from "react";
import { Switch, Route } from "react-router-dom";

import { PublicRoute } from "./components/organisms/PublicRoute";
import { PrivateRoute } from "./components/organisms/PrivateRoute";
import { PageWrapper } from "./components/organisms/PageWrapper";
import { HomePage } from "./components/pages/HomePage";
import { SignInPage } from "./components/pages/SignInPage";
import { RegisterPage } from "./components/pages/RegisterPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { CoursesPage } from "./components/pages/CoursesPage";
import { ModulesPage } from "./components/pages/ModulesPage";
import { CoursePage } from "./components/pages/CoursePage";
import { ModulePage } from "./components/pages/ModulePage";
import { CourseAddingPage } from "./components/pages/CourseAddingPage";
import { ModuleAddingPage } from "./components/pages/ModuleAddingPage";
import { CourseEditingPage } from "./components/pages/CourseEditingPage";
import { ModuleEditingPage } from "./components/pages/ModuleEditingPage";
import { MyCoursesPage } from "./components/pages/MyCoursesPage";
import { MyModulesPage } from "./components/pages/MyModulesPage";
import { InvitesPage } from "./components/pages/InvitesPage";

export const AppRoutes = () => (
  <PageWrapper>
    <Switch>
      <PublicRoute path="/sign-in" exact component={SignInPage} />
      <PublicRoute path="/register" exact component={RegisterPage} />
      <Route path="/invites/:link" exact component={InvitesPage} />
      <Switch>
        <PrivateRoute path="/profile" exact component={ProfilePage} />
        <PrivateRoute path="/courses" exact component={CoursesPage} />
        <PrivateRoute path="/modules" exact component={ModulesPage} />
        <PrivateRoute path="/my-courses" exact component={MyCoursesPage} />
        <PrivateRoute path="/my-modules" exact component={MyModulesPage} />
        <PrivateRoute path="/add-course" exact component={CourseAddingPage} />
        <PrivateRoute path="/add-module" exact component={ModuleAddingPage} />
        <PrivateRoute
          path="/enter-course/:course"
          exact
          component={CoursePage}
        />
        <PrivateRoute
          path="/enter-module/:module"
          exact
          component={ModulePage}
        />
        <PrivateRoute
          path="/edit-course/:course"
          exact
          component={CourseEditingPage}
        />
        <PrivateRoute
          path="/edit-module/:module"
          exact
          component={ModuleEditingPage}
        />
        <PrivateRoute path="*" component={HomePage} />
      </Switch>
    </Switch>
  </PageWrapper>
);

import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../utils/auth";

import { EmptyLine } from "../atoms/EmptyLine";

export const TopNavBar = ({ isPrivate }) => {
  const auth = useAuth();

  function clearSignOut() {
    auth.signout();
  }

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-warning fixed-top">
        <Link className="navbar-brand" to={"/"}>
          <b>DP APPLICATION</b>
        </Link>
        {isPrivate ? (
          <>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDp"
              aria-controls="navbarNavDp"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDp">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/"}>
                    <b>Home</b>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/courses"}>
                    <b>Courses</b>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/testing"}>
                    <b>Testing</b>
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <Link
                    to=""
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <b>{auth.profile}</b>
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <Link className="dropdown-item" to={"/profile"}>
                      My profile
                    </Link>
                    <Link className="dropdown-item" to={"/my-courses"}>
                      My courses
                    </Link>
                  </div>
                </li>
              </ul>
              <Link to={"/"} onClick={clearSignOut}>
                <i className="fa fa-sign-out-alt fa-fw" />
                <b>Sign out</b>
              </Link>
            </div>
          </>
        ) : null}
      </nav>
      <EmptyLine level="4" />
    </div>
  );
};

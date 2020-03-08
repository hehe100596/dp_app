import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../utils/auth";

export const TopNavBar = () => {
  const auth = useAuth();

  function clearSignOut() {
    auth.signout();
    localStorage.removeItem("dp-auth");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-warning">
        <Link className="navbar-brand" to={"/"}>
          <b>DP APPLICATION</b>
        </Link>
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
              <Link className="nav-link" to={"/testing"}>
                <b>Testing</b>
              </Link>
            </li>
          </ul>
        </div>
        <span>
          <Link to={"/"} onClick={clearSignOut}>
            <i className="fa fa-sign-out-alt fa-fw" />
            <b>Sign out</b>
          </Link>
        </span>
      </nav>
      <br />
    </div>
  );
};

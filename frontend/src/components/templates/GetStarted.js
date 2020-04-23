import React from "react";
import { Link } from "react-router-dom";

import { Heading } from "../atoms/Heading";
import { FontIcon } from "../atoms/FontIcon";
import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";

export function GetStarted() {
  return (
    <div className="container">
      <div className="row">
        <div className="col mb-4">
          <FontIcon icon="file-alt" className="fa-5x text-warning" />
          <EmptyLine level="1" />
          <Heading level="4">View Modules</Heading>
          <EmptyLine />
          <p className="mt-3">
            View all the modules you have been given access to.
          </p>
          <Link to={"/modules"}>
            <Button variant="warning" className="mt-2 text-white">
              <b>Continue</b>
            </Button>
          </Link>
        </div>
        <div className="col mb-4">
          <FontIcon icon="book" className="fa-5x text-danger" />
          <EmptyLine level="1" />
          <Heading level="4">Enter Courses</Heading>
          <EmptyLine />
          <p className="mt-3">
            Enter any course you have been given access to.
          </p>
          <Link to={"/courses"}>
            <Button variant="danger" className="mt-2 text-white">
              <b>Continue</b>
            </Button>
          </Link>
        </div>
        <div className="col mb-4">
          <FontIcon icon="id-badge" className="fa-5x text-secondary" />
          <EmptyLine level="1" />
          <Heading level="4">Edit Profile</Heading>
          <EmptyLine />
          <p className="mt-3">View and manage your profile information.</p>
          <Link to={"/profile"}>
            <Button variant="secondary" className="mt-2 text-white">
              <b>Continue</b>
            </Button>
          </Link>
        </div>
        <div className="col mb-4">
          <FontIcon icon="file-medical" className="fa-5x text-info" />
          <EmptyLine level="1" />
          <Heading level="4">Manage Modules</Heading>
          <EmptyLine />
          <p className="mt-3">
            Create, edit, delete or give access to your modules.
          </p>
          <Link to={"/my-modules"}>
            <Button variant="info" className="mt-2 text-white">
              <b>Continue</b>
            </Button>
          </Link>
        </div>
        <div className="col mb-4">
          <FontIcon icon="book-medical" className="fa-5x text-success" />
          <EmptyLine level="1" />
          <Heading level="4">Manage Courses</Heading>
          <EmptyLine />
          <p className="mt-3">
            Create, edit, delete or give access to your courses.
          </p>
          <Link to={"/my-courses"}>
            <Button variant="success" className="mt-2 text-white">
              <b>Continue</b>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

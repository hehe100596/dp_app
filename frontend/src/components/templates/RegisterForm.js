import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";

import { globalApiInstance } from "../../utils/api";

import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { ServerStatus } from "../organisms/ServerStatus";

export const registerSchema = yup.object().shape({
  mail: yup.string().label("E-mail").email().required(),
  name: yup.string().label("Name").required(),
  pass: yup
    .string()
    .label("Password")
    .required()
    .min(3, "Password should contain at least 3 characters"),
  pass2: yup
    .string()
    .label("Password confirmation")
    .required()
    .oneOf([yup.ref("pass"), null], "Passwords must match"),
});

export function RegisterForm() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  // TODO: Add proper e-mail existence verification, activation,
  // password change, FB and Google registration.

  function register(values) {
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "users/createNewUser", {
        mail: values.mail,
        name: values.name,
        pass: values.pass,
      })
      .then((res) => {
        setStatus("success");
        setMessage("Registration complete, you can sign in now");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message);
      });
    return 0;
  }

  function validate(values) {
    setStatus("loading");
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "users/getUserMail", {
        mail: values.mail,
      })
      .then((res) => {
        if (res.data.data) {
          setStatus("error");
          setMessage("E-mail is already in use, try again");
        } else {
          register(values);
        }
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message);
      });
    return 0;
  }

  return (
    <div align="center">
      <Formik
        initialValues={{ mail: "", pass: "", pass2: "" }}
        onSubmit={(values, actions) => {
          validate(values);
        }}
        validationSchema={registerSchema}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <EmptyLine level="1" />
            <div>
              <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.mail}
                style={
                  props.errors.mail
                    ? { width: "300px", backgroundColor: "rgba(255,0,0,0.2)" }
                    : { width: "300px" }
                }
                placeholder="e-mail"
                name="mail"
              />
              {props.errors.mail && (
                <>
                  <br />
                  <b className="text-danger">{props.errors.mail}</b>
                </>
              )}
            </div>
            <div className="mt-2">
              <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                style={
                  props.errors.name
                    ? { width: "300px", backgroundColor: "rgba(255,0,0,0.2)" }
                    : { width: "300px" }
                }
                placeholder="name"
                name="name"
              />
              {props.errors.name && (
                <>
                  <br />
                  <b className="text-danger">{props.errors.name}</b>
                </>
              )}
            </div>
            <div className="mt-2">
              <input
                type="password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.pass}
                style={
                  props.errors.pass
                    ? { width: "300px", backgroundColor: "rgba(255,0,0,0.2)" }
                    : { width: "300px" }
                }
                placeholder="password"
                name="pass"
              />
              {props.errors.pass && (
                <>
                  <br />
                  <b className="text-danger">{props.errors.pass}</b>
                </>
              )}
            </div>
            <div className="mt-2">
              <input
                type="password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.pass2}
                style={
                  props.errors.pass2
                    ? { width: "300px", backgroundColor: "rgba(255,0,0,0.2)" }
                    : { width: "300px" }
                }
                placeholder="confirm password"
                name="pass2"
              />
              {props.errors.pass2 && (
                <>
                  <br />
                  <b className="text-danger">{props.errors.pass2}</b>
                </>
              )}
            </div>
            <EmptyLine level="2" />
            <Button
              className={"btn btn-success mr-2"}
              style={{ width: "150px" }}
              type="submit"
            >
              <b>Submit</b>
            </Button>
            <Link to="/sign-in">
              <Button
                className={"btn btn-primary"}
                style={{ width: "150px" }}
                type="button"
              >
                <b>Sign in</b>
              </Button>
            </Link>
            <EmptyLine level="2" />
          </form>
        )}
      </Formik>
      <ServerStatus status={status} message={message} />
    </div>
  );
}

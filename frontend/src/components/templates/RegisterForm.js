import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";

import { globalApiInstance } from "../../utils/api";

import { Heading } from "../atoms/Heading";
import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { ErrorMessage } from "../molecules/ErrorMessage";
import { ServerStatus } from "../organisms/ServerStatus";

export const registerSchema = yup.object().shape({
  mail: yup
    .string()
    .label("E-mail")
    .email()
    .required(),
  pass: yup
    .string()
    .label("Password")
    .required()
    .min(3, "Password should contain at least 3 characters"),
  pass2: yup
    .string()
    .label("Password confirmation")
    .required()
    .oneOf([yup.ref("pass"), null], "Passwords must match")
});

export function RegisterForm() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  // TODO: Add e-mail existence verification, activation,
  // password change, FB and Google registration.

  function register(values) {
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "users/createNewUser", {
        mail: values.mail,
        pass: values.pass
      })
      .then(res => {
        setStatus("success");
        setMessage("Registration complete, you can sign in now");
      })
      .catch(err => {
        setStatus("error");
        setMessage(err.message);
      });
    return 0;
  }

  function validate(values) {
    setStatus("loading");
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "users/getUserMail", {
        mail: values.mail
      })
      .then(res => {
        if (res.data.data) {
          setStatus("error");
          setMessage("E-mail is already in use, try again");
        } else {
          register(values);
        }
      })
      .catch(err => {
        setStatus("error");
        setMessage(err.message);
      });
    return 0;
  }

  return (
    <div align="center">
      <EmptyLine level="1" />
      <Heading level="1">Register</Heading>
      <EmptyLine level="1" />
      <Formik
        initialValues={{ mail: "", pass: "", pass2: "" }}
        onSubmit={(values, actions) => {
          validate(values);
        }}
        validationSchema={registerSchema}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.mail}
              style={{ width: "300px" }}
              placeholder="e-mail"
              name="mail"
            />
            <EmptyLine />
            <input
              type="password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.pass}
              style={{ width: "300px" }}
              placeholder="password"
              name="pass"
            />
            <EmptyLine />
            <input
              type="password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.pass2}
              style={{ width: "300px" }}
              placeholder="confirm password"
              name="pass2"
            />
            <EmptyLine level="1" />
            <Button
              className={"btn btn-success mr-2"}
              style={{ width: "150px" }}
              type="submit"
            >
              <b>Next</b>
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
            <EmptyLine level="1" />
            {props.errors.mail && <ErrorMessage error={props.errors.mail} />}
            {props.errors.pass && <ErrorMessage error={props.errors.pass} />}
            {props.errors.pass2 && <ErrorMessage error={props.errors.pass2} />}
          </form>
        )}
      </Formik>
      <ServerStatus status={status} message={message} />
    </div>
  );
}

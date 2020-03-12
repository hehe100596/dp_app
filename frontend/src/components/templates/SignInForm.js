import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";

import { config } from "../../config";
import { useAuth } from "../../utils/auth";
import { globalApiInstance } from "../../utils/api";

import { Heading } from "../atoms/Heading";
import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { ErrorMessage } from "../molecules/ErrorMessage";
import { ServerStatus } from "../organisms/ServerStatus";

export const signInSchema = yup.object().shape({
  mail: yup
    .string()
    .label("E-mail")
    .email()
    .required(),
  pass: yup
    .string()
    .label("Password")
    .required()
});

export function SignInForm() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const auth = useAuth();

  function authenticate(values) {
    setStatus("loading");
    globalApiInstance
      .post(config.BASE_API + "users/getUserToken", {
        mail: values.mail,
        pass: values.pass
      })
      .then(res => {
        if (res.data.data) {
          auth.signin({ token: res.data.data.token, user: values.mail });
        } else {
          setStatus("error");
          setMessage("Incorrect e-mail or password");
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
      <Heading level="1">Sign in</Heading>
      <EmptyLine level="1" />
      <Formik
        initialValues={{ mail: "", pass: "" }}
        onSubmit={(values, actions) => {
          authenticate(values);
        }}
        validationSchema={signInSchema}
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
            <EmptyLine level="1" />
            <Button
              className={"btn btn-success mr-2"}
              style={{ width: "150px" }}
              type="submit"
            >
              <b>Next</b>
            </Button>
            <Link to="/register">
              <Button
                className={"btn btn-primary"}
                style={{ width: "150px" }}
                type="button"
              >
                <b>Register</b>
              </Button>
            </Link>
            <EmptyLine level="1" />
            {props.errors.mail && <ErrorMessage error={props.errors.mail} />}
            {props.errors.pass && <ErrorMessage error={props.errors.pass} />}
          </form>
        )}
      </Formik>
      <ServerStatus status={status} message={message} />
    </div>
  );
}

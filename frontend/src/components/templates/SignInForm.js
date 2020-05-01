import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";

import { useAuth } from "../../utils/auth";
import { globalApiInstance } from "../../utils/api";

import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { ServerStatus } from "../organisms/ServerStatus";

export const signInSchema = yup.object().shape({
  mail: yup.string().label("E-mail").email().required(),
  pass: yup.string().label("Password").required(),
});

export function SignInForm() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const auth = useAuth();

  function authenticate(values) {
    setStatus("loading");
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "users/getUser", {
        mail: values.mail,
        pass: values.pass,
      })
      .then((res) => {
        if (res.data.data) {
          setStatus("idle");
          auth.signin({
            token: res.data.data.token,
            user: values.mail,
            profile: res.data.data.name,
          });
        } else {
          setStatus("error");
          setMessage("Incorrect e-mail or password");
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
        initialValues={{ mail: "", pass: "" }}
        onSubmit={(values, actions) => {
          authenticate(values);
        }}
        validationSchema={signInSchema}
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
            <EmptyLine level="2" />
            <Button
              className={"btn btn-success mr-2"}
              style={{ width: "150px" }}
              type="submit"
            >
              <b>Login</b>
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
            <EmptyLine level="2" />
          </form>
        )}
      </Formik>
      <ServerStatus status={status} message={message} />
    </div>
  );
}

import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

import { Heading } from "../atoms/Heading";
import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { ErrorMessage } from "../molecules/ErrorMessage";

const userSchema = yup.object().shape({
  mail: yup
    .string()
    .label("Email")
    .email()
    .required(),
  pass: yup
    .string()
    .label("Password")
    .required()
});

export function SignInForm() {
  return (
    <div align="center">
      <br />
      <Heading level="1">Sign in</Heading>
      <br />
      <Formik
        initialValues={{ mail: "", pass: "" }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values));
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 1000);
        }}
        validationSchema={userSchema}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.mail}
              placeholder="e-mail"
              name="mail"
            />
            <EmptyLine />
            <input
              type="password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.pass}
              placeholder="pass"
              name="pass"
            />
            <EmptyLine level="1" />
            <Button className={"btn btn-success"} type="submit">
              Next
            </Button>
            <EmptyLine level="1" />
            {props.errors.mail && <ErrorMessage error={props.errors.mail} />}
            {props.errors.pass && <ErrorMessage error={props.errors.pass} />}
          </form>
        )}
      </Formik>
    </div>
  );
}

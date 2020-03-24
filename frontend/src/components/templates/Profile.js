import React, { useState } from "react";
import { Formik } from "formik";
import swal from "sweetalert";
import * as yup from "yup";

import avatar from "../../img/avatar.png";

import { useAuth } from "../../utils/auth";
import { globalApiInstance } from "../../utils/api";

import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { ErrorMessage } from "../molecules/ErrorMessage";
import { ServerStatus } from "../organisms/ServerStatus";

export const changePassSchema = yup.object().shape({
  old: yup
    .string()
    .label("Old password")
    .required(),
  new: yup
    .string()
    .label("New password")
    .required()
    .notOneOf([yup.ref("old"), null], "New password is the same as old")
    .min(3, "New password should contain at least 3 characters"),
  new2: yup
    .string()
    .label("New password confirmation")
    .required()
    .oneOf([yup.ref("new"), null], "Passwords must match")
});

export function Profile() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const auth = useAuth();

  // TODO: Add more info and profile picture settings.

  function deleteUser() {
    swal({
      title: "Do you want to delete this account?",
      text: "You are about to delete your account. Are you sure about it?",
      icon: "warning",
      buttons: ["No", "Yes"]
    }).then(function(isConfirm) {
      if (isConfirm) {
        setStatus("loading");
        globalApiInstance
          .post(process.env.REACT_APP_BASE_API + "users/deleteUser", {
            mail: auth.user,
            token: auth.token
          })
          .then(res => {
            auth.signout();
          })
          .catch(err => {
            setStatus("error");
            setMessage(err.message);
          });
      }
    });
    return 0;
  }

  function changePassword(values) {
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "users/changePassword", {
        mail: auth.user,
        token: auth.token,
        pass: values.new
      })
      .then(res => {
        setStatus("success");
        setMessage("Password was successfully changed");
      })
      .catch(err => {
        setStatus("error");
        setMessage(err.message);
      });
    return 0;
  }

  function validatePassword(values) {
    setStatus("loading");
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "users/getUserToken", {
        mail: auth.user,
        pass: values.old
      })
      .then(res => {
        if (res.data.data) {
          changePassword(values);
        } else {
          setStatus("error");
          setMessage("Old password is incorrect");
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
      <Formik
        initialValues={{
          user: auth.user,
          profile: auth.profile,
          old: "",
          new: "",
          new2: ""
        }}
        onSubmit={(values, actions) => {
          validatePassword(values);
        }}
        validationSchema={changePassSchema}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-auto my-auto text-left">
                  <img src={avatar} alt="avatar" height="215px" />
                </div>
                <div className="col-auto my-auto">
                  <div className="row mb-3">
                    <input
                      type="text"
                      onBlur={props.handleBlur}
                      value={props.values.user}
                      style={{ width: "200px" }}
                      name="user"
                      disabled
                    />
                  </div>
                  <div className="row mb-3">
                    <input
                      type="text"
                      onBlur={props.handleBlur}
                      value={props.values.profile}
                      style={{ width: "200px" }}
                      name="profile"
                      disabled
                    />
                  </div>
                  <div className="row mb-3">
                    <input
                      type="password"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.old}
                      style={{ width: "200px" }}
                      placeholder="old password"
                      name="old"
                    />
                  </div>
                  <div className="row mb-3">
                    <input
                      type="password"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.new}
                      style={{ width: "200px" }}
                      placeholder="new password"
                      name="new"
                    />
                  </div>
                  <div className="row">
                    <input
                      type="password"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.new2}
                      style={{ width: "200px" }}
                      placeholder="confirm new password"
                      name="new2"
                    />
                  </div>
                </div>
              </div>
              <EmptyLine level="1" />
              <div className="row">
                <div className="col">
                  <Button
                    className={"btn btn-danger ml-3"}
                    style={{ width: "200px" }}
                    type="button"
                    onClick={deleteUser}
                  >
                    <b>Delete account</b>
                  </Button>
                  <Button
                    className={"btn btn-success ml-3"}
                    style={{ width: "200px" }}
                    type="submit"
                  >
                    <b>Change password</b>
                  </Button>
                </div>
              </div>
            </div>
            <EmptyLine level="1" />
            {props.errors.old && <ErrorMessage error={props.errors.old} />}
            {props.errors.new && <ErrorMessage error={props.errors.new} />}
            {props.errors.new2 && <ErrorMessage error={props.errors.new2} />}
          </form>
        )}
      </Formik>
      <br />
      <ServerStatus status={status} message={message} />
    </div>
  );
}

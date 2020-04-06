import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import { useAuth } from "../../utils/auth";
import { globalApiInstance } from "../../utils/api";

import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { ErrorMessage } from "../molecules/ErrorMessage";
import { ServerStatus } from "../organisms/ServerStatus";

export const moduleInfoSchema = yup.object().shape({
  name: yup.string().label("Name").required(),
  cat: yup.string().label("Category").required(),
});

export function ModuleModification({ moduleId, changeTab }) {
  const auth = useAuth();

  const [module, setModule] = useState({
    name: "",
    cat: "",
    type: "Info",
    author: auth.user,
    limit: 0,
  });

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(null);

  function saveModuleInfo(values) {
    setStatus("loading");

    if (moduleId) {
      globalApiInstance
        .post(process.env.REACT_APP_BASE_API + "modules/updateModuleInfo", {
          moduleId: moduleId,
          name: values.name,
          cat: values.cat,
          type: values.type,
          limit: values.limit,
        })
        .then((res) => {
          setStatus("success");
          setMessage("Module successfully updated");
        })
        .catch((err) => {
          setStatus("error");
          setMessage(err.message);
        });
    } else {
      globalApiInstance
        .post(process.env.REACT_APP_BASE_API + "modules/createNewModule", {
          name: values.name,
          cat: values.cat,
          type: values.type,
          author: values.author,
          limit: values.limit,
          withAccess: auth.token,
        })
        .then((res) => {
          changeTab(res.data.data);
        })
        .catch((err) => {
          setStatus("error");
          setMessage(err.message);
        });
    }

    return 0;
  }

  useEffect(() => {
    if (moduleId)
      globalApiInstance
        .post(process.env.REACT_APP_BASE_API + "modules/getModule", {
          module: moduleId,
        })
        .then((res) => {
          setModule(res.data.data);
          setStatus("success");
        })
        .catch((err) => {
          setStatus("error");
          setMessage(err.message);
        });
    else setStatus("idle");
  }, [moduleId]);

  return (
    <div align="center">
      <Formik
        initialValues={{
          name: module.name,
          cat: module.cat,
          type: module.type,
          author: module.author,
          limit: module.limit,
        }}
        onSubmit={(values, actions) => {
          saveModuleInfo(values);
        }}
        validationSchema={moduleInfoSchema}
        enableReinitialize
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div className="container">
              <div className="row w-75">
                <div className="col mb-4">
                  <b>Name</b>
                  <br />
                  <input
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.name}
                    style={{ width: "300px", height: "30px" }}
                    name="name"
                    placeholder="name"
                  />
                </div>
                <div className="col mb-4">
                  <b>Category</b>
                  <br />
                  <input
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.cat}
                    style={{ width: "300px", height: "30px" }}
                    name="cat"
                    placeholder="category"
                  />
                </div>
              </div>
              <div className="row w-75">
                <div className="col mb-4">
                  <b>Type</b>
                  <br />
                  <select
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.type}
                    style={{ width: "300px", height: "30px" }}
                    name="type"
                  >
                    <option value="Info">Info</option>
                    <option value="Test">Test</option>
                  </select>
                </div>
                <div className="col mb-4">
                  <b>Time limit (in minutes, 0 means none)</b>
                  <br />
                  <input
                    type="number"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.limit}
                    min="0"
                    max="1440"
                    style={{ width: "300px", height: "30px" }}
                    name="limit"
                  />
                </div>
              </div>
              <EmptyLine level="2" />
              <div className="row justify-content-center">
                <Button
                  className={"btn btn-primary"}
                  style={{ width: "250px" }}
                  type="submit"
                >
                  <b>Save module info</b>
                </Button>
              </div>
            </div>
            <EmptyLine level="2" />
            {props.errors.name && <ErrorMessage error={props.errors.name} />}
            {props.errors.cat && <ErrorMessage error={props.errors.cat} />}
          </form>
        )}
      </Formik>
      <EmptyLine level="1" />
      <ServerStatus status={status} message={message} />
    </div>
  );
}

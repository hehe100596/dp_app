import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import { useAuth } from "../../utils/auth";
import { globalApiInstance } from "../../utils/api";

import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { ServerStatus } from "../organisms/ServerStatus";

export const courseInfoSchema = yup.object().shape({
  name: yup.string().label("Name").required(),
  org: yup.string().label("Organizer").required(),
  cat: yup.string().label("Category").required(),
  length: yup.string().label("Duration").required(),
});

export function CourseModification({ courseId, changeTab }) {
  const auth = useAuth();

  const [course, setCourse] = useState({
    name: "",
    org: "",
    cat: "",
    level: "Beginner",
    length: "",
    status: "Active",
    author: auth.user,
  });

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(null);

  function saveCourseInfo(values) {
    setStatus("loading");

    if (courseId) {
      globalApiInstance
        .post(process.env.REACT_APP_BASE_API + "courses/updateCourseInfo", {
          courseId: courseId,
          name: values.name,
          org: values.org,
          cat: values.cat,
          level: values.level,
          length: values.length,
          status: values.status,
        })
        .then((res) => {
          setStatus("success");
          setMessage("Course successfully updated");
        })
        .catch((err) => {
          setStatus("error");
          setMessage(err.message);
        });
    } else {
      globalApiInstance
        .post(process.env.REACT_APP_BASE_API + "courses/createNewCourse", {
          name: values.name,
          org: values.org,
          cat: values.cat,
          level: values.level,
          length: values.length,
          status: values.status,
          author: values.author,
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
    if (courseId)
      globalApiInstance
        .post(process.env.REACT_APP_BASE_API + "courses/getCourse", {
          course: courseId,
        })
        .then((res) => {
          setCourse(res.data.data);
          setStatus("success");
        })
        .catch((err) => {
          setStatus("error");
          setMessage(err.message);
        });
    else setStatus("idle");
  }, [courseId]);

  return (
    <div align="center">
      <Formik
        initialValues={{
          name: course.name,
          org: course.org,
          cat: course.cat,
          level: course.level,
          length: course.length,
          status: course.status,
          author: course.author,
        }}
        onSubmit={(values, actions) => {
          saveCourseInfo(values);
        }}
        validationSchema={courseInfoSchema}
        enableReinitialize
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div className="container">
              <div className="col mb-4">
                <b>Name (should be unique)</b>
                <br />
                <input
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.name}
                  style={
                    props.errors.name
                      ? {
                          width: "300px",
                          height: "30px",
                          backgroundColor: "rgba(255,0,0,0.2)",
                        }
                      : { width: "300px", height: "30px" }
                  }
                  name="name"
                  placeholder="name"
                />
                {props.errors.name && (
                  <>
                    <br />
                    <b className="text-danger">{props.errors.name}</b>
                  </>
                )}
              </div>
              <div className="col mb-4">
                <b>Organizer (who is this course from)</b>
                <br />
                <input
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.org}
                  style={
                    props.errors.org
                      ? {
                          width: "300px",
                          height: "30px",
                          backgroundColor: "rgba(255,0,0,0.2)",
                        }
                      : { width: "300px", height: "30px" }
                  }
                  name="org"
                  placeholder="organizer"
                />
                {props.errors.org && (
                  <>
                    <br />
                    <b className="text-danger">{props.errors.org}</b>
                  </>
                )}
              </div>
              <div className="col mb-4">
                <b>Category (medical, technical, etc.)</b>
                <br />
                <input
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.cat}
                  style={
                    props.errors.cat
                      ? {
                          width: "300px",
                          height: "30px",
                          backgroundColor: "rgba(255,0,0,0.2)",
                        }
                      : { width: "300px", height: "30px" }
                  }
                  name="cat"
                  placeholder="category"
                />
                {props.errors.cat && (
                  <>
                    <br />
                    <b className="text-danger">{props.errors.cat}</b>
                  </>
                )}
              </div>
              <div className="col mb-4">
                <b>Duration (how long it should take)</b>
                <br />
                <input
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.length}
                  style={
                    props.errors.length
                      ? {
                          width: "300px",
                          height: "30px",
                          backgroundColor: "rgba(255,0,0,0.2)",
                        }
                      : { width: "300px", height: "30px" }
                  }
                  name="length"
                  placeholder="duration"
                />
                {props.errors.length && (
                  <>
                    <br />
                    <b className="text-danger">{props.errors.length}</b>
                  </>
                )}
              </div>
              <div className="col mb-4">
                <b>Level (estimated difficulty)</b>
                <br />
                <select
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.level}
                  style={{ width: "300px", height: "30px" }}
                  name="level"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Elementary">Elementary</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div className="col mb-4">
                <b>Status (current accessibility)</b>
                <br />
                <select
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.status}
                  style={{ width: "300px", height: "30px" }}
                  name="status"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <EmptyLine level="2" />
              <div className="row justify-content-center">
                <Button
                  className={"btn btn-primary"}
                  style={{ width: "250px" }}
                  type="submit"
                >
                  <b>Save course info</b>
                </Button>
              </div>
            </div>
            <EmptyLine level="2" />
          </form>
        )}
      </Formik>
      <EmptyLine level="1" />
      <ServerStatus status={status} message={message} />
    </div>
  );
}

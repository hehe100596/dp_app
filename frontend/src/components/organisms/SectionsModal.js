import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Formik } from "formik";
import * as yup from "yup";

import { useAuth } from "../../utils/auth";
import { globalApiInstance } from "../../utils/api";

import { Heading } from "../atoms/Heading";
import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { FontIcon } from "../atoms/FontIcon";
import { ErrorMessage } from "../molecules/ErrorMessage";
import { Loading } from "../molecules/Loading";

export const sectionSchema = yup.object().shape({
  name: yup.string().label("Name").required(),
});

export function SectionsModal({ sectionId, courseId, closeModal }) {
  const defaultSection = {
    name: "",
    rewardMargin: 0,
    rewardPoints: 0,
    unlockPoints: 0,
    minPoints: 0,
    penalty: 0,
  };

  const defaultModules = [
    {
      _id: "new",
      name: "select module",
      points: 0,
    },
  ];

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(null);
  const [section, setSection] = useState(defaultSection);
  const [modules, setModules] = useState(defaultModules);
  const [modulePoints, setModulePoints] = useState(0);
  const [allModules, setAllModules] = useState([]);

  const auth = useAuth();
  const totalPointsInfo =
    "Total points determine how many points you can get for " +
    "this section regardless of the number of points you can " +
    "get for all of its modules.\nFor example: if you have three " +
    "modules and the maximum number of points you can get for " +
    "each of them separately is 2 (meaning you should be able " +
    "to get 6 points in total for this section), then if you " +
    'set "Total points for this section" to 3, the maximum ' +
    "number of points for each module in this section will " +
    "instead automatically become 1 (thus making it 3 in " +
    "total for the entire section).";
  const penaltyInfo =
    "Penalty determines how many points will be subtracted " +
    "from the total number of received points for this section " +
    "in case the minimum requirement is not met. Make sure to " +
    "use this option carefully (if you subtract too many points, " +
    "it might not be possible to finish the course).";

  const closeSectionModal = (isExit) => {
    setStatus("loading");
    setMessage(null);
    setSection(defaultSection);
    setModules(defaultModules);
    setModulePoints(0);
    setAllModules([]);
    closeModal(isExit);
  };

  const parseModules = (dataModules) => {
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "modules/getModules", {
        modules: dataModules,
      })
      .then((res) => {
        if (res.data.data) {
          let parsedModules = Array(res.data.data.length);
          let dataModulesPoints = 0;

          res.data.data.forEach(function (entry) {
            let totalPoints = 0;
            entry.content.forEach(function (entry) {
              totalPoints += entry.points;
            });

            let parsedModule = {
              _id: entry._id,
              name: entry._name,
              points: totalPoints,
            };

            let moduleIndex = dataModules.indexOf(entry._id);
            parsedModules[moduleIndex] = parsedModule;
            dataModulesPoints += totalPoints;
          });

          setModules(parsedModules);
          setModulePoints(dataModulesPoints);
        }
      });
  };

  const addModule = () => {
    let updatedModules = [...modules];
    updatedModules.push(defaultModules[0]);

    setModules(updatedModules);
  };

  const updateModule = (index, value) => {
    let updatedModules = [...modules];
    let updatedPoints = 0;

    updatedModules[index] = allModules.find((obj) => obj._id === value);
    setModules(updatedModules);

    updatedModules.forEach(function (entry) {
      updatedPoints += entry.points;
    });
    setModulePoints(updatedPoints);
  };

  const removeModule = (index, points) => {
    let updatedModules = [...modules];
    let updatedPoints = modulePoints;

    updatedModules.splice(index, 1);
    updatedPoints -= points;

    setModules(updatedModules);
    setModulePoints(updatedPoints);
  };

  const moveUp = (index) => {
    let updatedModules = [...modules];
    let tmpModule = updatedModules[index - 1];

    updatedModules[index - 1] = updatedModules[index];
    updatedModules[index] = tmpModule;

    setModules(updatedModules);
  };

  const moveDown = (index) => {
    let updatedModules = [...modules];
    let tmpModule = updatedModules[index + 1];

    updatedModules[index + 1] = updatedModules[index];
    updatedModules[index] = tmpModule;

    setModules(updatedModules);
  };

  const saveSection = (values) => {
    setStatus("loading");

    let moduleIds = [];
    modules.forEach(function (entry) {
      moduleIds.push(entry._id);
    });

    if (moduleIds.includes("new")) {
      setStatus("error");
      setMessage("All modules must be selected");
      return;
    }

    let findDuplicates = (arr) =>
      arr.filter((item, index) => arr.indexOf(item) !== index);

    if (findDuplicates(moduleIds).length > 0) {
      setStatus("error");
      setMessage("One module cannot be selected more than once");
      return;
    }

    let newRewardMargin =
      modulePoints === 0 ? 0 : values.rewardPoints / modulePoints;

    let newSection = {
      name: values.name,
      modules: moduleIds,
      rewardMargin: newRewardMargin,
      rewardPoints: values.rewardPoints,
      unlockPoints: values.unlockPoints,
      minPoints: values.minPoints,
      penalty: values.penalty,
    };

    if (sectionId === "new") {
      globalApiInstance
        .post(process.env.REACT_APP_BASE_API + "courses/addNewSection", {
          courseId: courseId,
          section: newSection,
        })
        .then((res) => {
          closeSectionModal(false);
        })
        .catch((err) => {
          setStatus("error");
          setMessage(err.message);
        });
    } else {
      globalApiInstance
        .post(process.env.REACT_APP_BASE_API + "courses/updateSection", {
          sectionId: sectionId,
          courseId: courseId,
          section: newSection,
        })
        .then((res) => {
          closeSectionModal(false);
        })
        .catch((err) => {
          setStatus("error");
          setMessage(err.message);
        });
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      minWidth: "650px",
      maxHeight: "calc(100vh - 100px)",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflowY: "auto",
    },
  };

  useEffect(() => {
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "modules/getAccessibleModules", {
        user: auth.token,
      })
      .then((res) => {
        if (res.data.data) {
          let results = [
            {
              _id: "new",
              name: "select module",
              points: 0,
            },
          ];

          res.data.data.forEach(function (entry) {
            let points = 0;

            if (entry.content && entry.content.length > 0) {
              entry.content.forEach(function (entry) {
                points += entry.points;
              });
            }

            let module = {
              _id: entry._id,
              name: entry.name,
              points: points,
            };
            results.push(module);
          });

          setAllModules(results);

          if (sectionId) {
            if (sectionId !== "new") {
              globalApiInstance
                .post(process.env.REACT_APP_BASE_API + "courses/getSection", {
                  courseId: courseId,
                  sectionId: sectionId,
                })
                .then((res) => {
                  parseModules(res.data.data.modules);
                  setSection(res.data.data);
                  setStatus("success");
                })
                .catch((err) => {
                  setStatus("error");
                  setMessage(err.message);
                });
            } else {
              setStatus("idle");
            }
          }
        }
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message);
      });
  }, [courseId, sectionId, auth.token]);

  return (
    <Modal
      isOpen={sectionId !== null}
      onRequestClose={(e) => closeSectionModal(true)}
      style={customStyles}
      ariaHideApp={false}
    >
      <div align="center">
        <EmptyLine level="2" />
        <Heading level="2">
          {sectionId === "new" ? "ADD SECTION" : "EDIT SECTION"}
        </Heading>
        <EmptyLine level="2" />
        <Formik
          initialValues={{
            name: section.name,
            rewardPoints: section.rewardPoints,
            unlockPoints: section.unlockPoints,
            minPoints: section.minPoints,
            penalty: section.penalty,
          }}
          onSubmit={(values, actions) => {
            saveSection(values);
          }}
          validationSchema={sectionSchema}
          enableReinitialize
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className="container">
                <div className="row">
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
                              width: "250px",
                              height: "30px",
                              backgroundColor: "rgba(255,0,0,0.2)",
                            }
                          : { width: "250px", height: "30px" }
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
                    <b>Points needed for unlocking</b>
                    <br />
                    <input
                      type="number"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.unlockPoints}
                      min="0"
                      max="10000"
                      style={{ width: "250px", height: "30px" }}
                      name="unlockPoints"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-4">
                    <b>Points from selected modules</b>
                    <br />
                    <input
                      type="text"
                      value={modulePoints}
                      style={{ width: "250px", height: "30px" }}
                      name="modulePoints"
                      disabled
                    />
                  </div>
                  <div className="col mb-4">
                    <b>Total points for this section</b>{" "}
                    <FontIcon icon="question-circle" title={totalPointsInfo} />
                    <br />
                    <input
                      type="number"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.rewardPoints}
                      min="0"
                      max="10000"
                      style={{ width: "250px", height: "30px" }}
                      name="rewardPoints"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-4">
                    <b>Minimum points required</b>
                    <br />
                    <input
                      type="number"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.minPoints}
                      min="0"
                      max={props.values.rewardPoints}
                      style={{ width: "250px", height: "30px" }}
                      name="minPoints"
                    />
                  </div>
                  <div className="col mb-4">
                    <b>Penalty for failing</b>{" "}
                    <FontIcon icon="question-circle" title={penaltyInfo} />
                    <br />
                    <input
                      type="number"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.penalty}
                      min="0"
                      max="10000"
                      style={{ width: "250px", height: "30px" }}
                      name="penalty"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-4">
                    <b>Modules (in chronological order)</b>
                    <br />
                    {modules.map((module, i) => (
                      <div key={i}>
                        <select
                          className="mb-1"
                          onChange={(e) => updateModule(i, e.target.value)}
                          onBlur={(e) => updateModule(i, e.target.value)}
                          value={module._id}
                          style={{ width: "430px", height: "38px" }}
                        >
                          {allModules.map((module, i) => (
                            <option key={i} value={module._id}>
                              {module.name}
                            </option>
                          ))}
                        </select>
                        <Button
                          className="btn btn-danger ml-2"
                          type="button"
                          disabled={modules.length === 1}
                          onClick={(e) => removeModule(i, module.points)}
                        >
                          <FontIcon icon="minus" />
                        </Button>
                        <Button
                          className="btn btn-info ml-1"
                          onClick={(e) => moveDown(i)}
                          disabled={i >= modules.length - 1}
                        >
                          <FontIcon icon="long-arrow-alt-down" />
                        </Button>
                        <Button
                          className="btn btn-info ml-1"
                          onClick={(e) => moveUp(i)}
                          disabled={i <= 0}
                        >
                          <FontIcon icon="long-arrow-alt-up" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      className={"btn btn-success"}
                      style={{ width: "200px" }}
                      type="button"
                      onClick={addModule}
                    >
                      <b>Insert</b>
                    </Button>
                  </div>
                </div>
                <EmptyLine level="2" />
                <Button
                  className={"btn btn-primary ml-2 mr-2"}
                  style={{ width: "200px" }}
                  type="submit"
                >
                  <b>Save</b>
                </Button>
                <Button
                  className={"btn btn-secondary ml-2 mr-2 "}
                  style={{ width: "200px" }}
                  type="button"
                  onClick={closeSectionModal}
                >
                  <b>Close</b>
                </Button>
              </div>
              <EmptyLine level="2" />
              {status === "loading" ? (
                <Loading />
              ) : status === "error" ? (
                <ErrorMessage error={message} />
              ) : null}
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}

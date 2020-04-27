import React, { useState, useEffect } from "react";
import CKEditor from "ckeditor4-react";
import Modal from "react-modal";
import { Formik } from "formik";
import * as yup from "yup";

import { globalApiInstance } from "../../utils/api";

import { Heading } from "../atoms/Heading";
import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { FontIcon } from "../atoms/FontIcon";
import { ErrorMessage } from "../molecules/ErrorMessage";
import { Loading } from "../molecules/Loading";

export const moduleInfoSchema = yup.object().shape({
  name: yup.string().label("Name").required(),
});

export function TestSegmentsModal({ segmentId, moduleId, type, closeModal }) {
  // TODO: Add other test segment types!

  const defaultSegment = {
    name: "",
    rqmt: "",
    points: 0,
  };

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(null);
  const [segment, setSegment] = useState(defaultSegment);
  const [segmentQuestion, setSegmentQuestion] = useState("");
  const [segmentChoices, setSegmentChoices] = useState([""]);
  const [segmentAnswers, setSegmentAnswers] = useState([""]);
  const [segmentData, setSegmentData] = useState(
    "loading failed, close and try again"
  );

  const addChoice = () => {
    let updatedChoices = [...segmentChoices];
    updatedChoices.push("");

    setSegmentChoices(updatedChoices);
  };

  const removeChoice = (index, segment) => {
    let updatedChoices = [...segmentChoices];
    let updatedAnswers = [...segmentAnswers];
    let segmentIndex = updatedAnswers.indexOf(segment);

    updatedChoices.splice(index, 1);
    updatedAnswers.splice(segmentIndex, 1);

    setSegmentChoices(updatedChoices);
    if (segmentIndex >= 0) {
      setSegmentAnswers(updatedAnswers);
    }
  };

  const updateAnswer = (segment, isChecked) => {
    let updatedAnswers = [...segmentAnswers];

    if (isChecked) {
      if (segment) {
        updatedAnswers.push(segment);
        setStatus("idle");
      } else {
        setMessage("Empty choice cannot be among correct answers");
        setStatus("error");
      }
    } else {
      updatedAnswers = updatedAnswers.filter((e) => e !== segment);
    }

    setSegmentAnswers(updatedAnswers);
  };

  const updateAnswers = (segment) => {
    if (segment) {
      setSegmentAnswers([segment]);
      setStatus("idle");
    } else {
      setMessage("Empty choice cannot be the correct answer");
      setStatus("error");
    }
  };

  const updateChoice = (index, value) => {
    let updatedChoices = [...segmentChoices];
    let updatedAnswers = [...segmentAnswers];
    let answerIndex = updatedAnswers.indexOf(updatedChoices[index]);

    updatedChoices[index] = value;
    updatedAnswers[answerIndex] = value;

    setSegmentChoices(updatedChoices);
    setSegmentAnswers(updatedAnswers);
  };

  const closeSegmentModal = (isExit) => {
    setStatus("loading");
    setMessage(null);
    setSegment(defaultSegment);
    setSegmentQuestion("");
    setSegmentChoices([""]);
    setSegmentAnswers([""]);
    setSegmentData("loading failed, close and try again");
    closeModal(isExit);
  };

  const saveSegment = (values) => {
    setStatus("loading");

    if (segmentData || segmentQuestion) {
      let segmentContent = segmentData;
      let answers = values.rqmt;

      if (
        values.sType === "One correct choice" ||
        values.sType === "Multiple correct choices"
      ) {
        segmentContent = "";
        segmentContent += segmentQuestion;
        segmentContent += ";;;";

        segmentChoices.forEach(function (entry) {
          segmentContent += entry;
          segmentContent += ";;;";
        });

        if (segmentAnswers) {
          answers = "";
          segmentAnswers.forEach(function (entry) {
            if (entry) {
              answers += entry;
              answers += ";;;";
            }
          });
        }

        if (type === "One correct choice" && answers === "") {
          setMessage("One answer is required");
          setStatus("error");
          return;
        }
      }

      let newSegment = {
        name: values.name,
        sType: type,
        rqmt: type === "HTML" ? "0" : answers,
        points: values.points,
        data: segmentContent,
      };

      if (segmentId === "new") {
        globalApiInstance
          .post(process.env.REACT_APP_BASE_API + "modules/addNewSegment", {
            moduleId: moduleId,
            segment: newSegment,
          })
          .then((res) => {
            closeSegmentModal(false);
          })
          .catch((err) => {
            setStatus("error");
            setMessage(err.message);
          });
      } else {
        globalApiInstance
          .post(process.env.REACT_APP_BASE_API + "modules/updateSegment", {
            segmentId: segmentId,
            moduleId: moduleId,
            segment: newSegment,
          })
          .then((res) => {
            closeSegmentModal(false);
          })
          .catch((err) => {
            setStatus("error");
            setMessage(err.message);
          });
      }
    } else {
      setStatus("error");

      if (values.sType === "HTML") {
        setMessage("Data is a required field");
      } else {
        setMessage("Question is a required field");
      }
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
    if (segmentId) {
      if (segmentId !== "new") {
        globalApiInstance
          .post(process.env.REACT_APP_BASE_API + "modules/getSegment", {
            moduleId: moduleId,
            segmentId: segmentId,
          })
          .then((res) => {
            if (
              res.data.data.sType === "One correct choice" ||
              res.data.data.sType === "Multiple correct choices"
            ) {
              const multiData = res.data.data.data;
              const multiRqmt = res.data.data.rqmt;

              const multiQuestion = multiData.split(";;;")[0];
              const multiChoices = multiData.split(";;;").slice(1, -1);
              const multiAnswers = multiRqmt.split(";;;").slice(0, -1);

              setSegmentQuestion(multiQuestion);
              setSegmentChoices(multiChoices);
              setSegmentAnswers(multiAnswers);
            }

            setSegmentData(res.data.data.data);
            setSegment(res.data.data);
            setStatus("success");
          })
          .catch((err) => {
            setStatus("error");
            setMessage(err.message);
          });
      } else {
        setSegmentData("");
        setStatus("idle");
      }
    }
  }, [moduleId, segmentId]);

  return (
    <Modal
      isOpen={segmentId !== null}
      onRequestClose={(e) => closeSegmentModal(true)}
      style={customStyles}
      ariaHideApp={false}
    >
      <div align="center">
        <EmptyLine level="2" />
        <Heading level="2">
          {segmentId === "new" ? "ADD TEST SEGMENT" : "EDIT TEST SEGMENT"}
        </Heading>
        <EmptyLine level="2" />
        <Formik
          initialValues={{
            name: segment.name,
            sType: type,
            rqmt: segment.rqmt,
            points: segment.points,
          }}
          onSubmit={(values, actions) => {
            saveSegment(values);
          }}
          validationSchema={moduleInfoSchema}
          enableReinitialize
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className="container">
                <div className="row">
                  <div className="col mb-4">
                    <b>Name of the segment</b>
                    <br />
                    <input
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.name}
                      style={{ width: "250px", height: "30px" }}
                      name="name"
                      placeholder="name"
                    />
                  </div>
                  <div className="col mb-4">
                    <b>Type of the segment</b>
                    <br />
                    <input
                      type="text"
                      value={props.values.sType}
                      style={{ width: "250px", height: "30px" }}
                      name="sType"
                      placeholder="category"
                      disabled
                    />
                  </div>
                </div>
                {type === "Text answer" ? (
                  <div className="row">
                    <div className="col mb-4">
                      <b>Question</b>
                      <br />
                      <textarea
                        onChange={(e) => setSegmentData(e.target.value)}
                        onBlur={(e) => setSegmentData(e.target.value)}
                        value={segmentData}
                        style={{ width: "555px", height: "100px" }}
                        name="data"
                        placeholder="put question here"
                      />
                    </div>
                  </div>
                ) : type === "One correct choice" ||
                  type === "Multiple correct choices" ? (
                  <>
                    <div className="row">
                      <div className="col mb-4">
                        <b>Question</b>
                        <br />
                        <textarea
                          onChange={(e) => setSegmentQuestion(e.target.value)}
                          onBlur={(e) => setSegmentQuestion(e.target.value)}
                          value={segmentQuestion}
                          style={{ width: "555px", height: "100px" }}
                          name="question"
                          placeholder="put question here"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col mb-4">
                        <b>
                          Choices (check correct answer
                          {type === "Multiple correct choices" ? "s)" : ")"}
                        </b>
                        <br />
                        {segmentChoices.map((seg, i) => (
                          <div key={i}>
                            {type === "One correct choice" ? (
                              <input
                                type="radio"
                                onChange={(e) => updateAnswers(seg)}
                                name="radio-boxes"
                                checked={seg && segmentAnswers.includes(seg)}
                                style={{ width: "15px", height: "15px" }}
                              />
                            ) : (
                              <input
                                type="checkbox"
                                onChange={(e) =>
                                  updateAnswer(seg, e.target.checked)
                                }
                                name="checkbox-boxes"
                                checked={seg && segmentAnswers.includes(seg)}
                                style={{ width: "15px", height: "15px" }}
                              />
                            )}
                            <input
                              type="text"
                              className="ml-2 mb-1"
                              onChange={(e) => updateChoice(i, e.target.value)}
                              onBlur={(e) => updateChoice(i, e.target.value)}
                              value={seg}
                              style={{ width: "480px", height: "38px" }}
                              placeholder={"choice " + (i + 1)}
                            />
                            <Button
                              className={"btn btn-danger ml-2"}
                              type="button"
                              disabled={segmentChoices.length === 1}
                              onClick={(e) => removeChoice(i, seg)}
                            >
                              <FontIcon icon="minus" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          className={"btn btn-success"}
                          style={{ width: "200px" }}
                          type="button"
                          onClick={addChoice}
                        >
                          <b>Insert</b>
                        </Button>
                      </div>
                    </div>
                  </>
                ) : null}
                {type === "HTML" ? null : (
                  <div className="row">
                    {type === "Text answer" ? (
                      <div className="col mb-4">
                        <b>Correct answer</b>
                        <br />
                        <input
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.rqmt}
                          style={{ width: "250px", height: "30px" }}
                          name="rqmt"
                          placeholder="put correct answer here"
                        />
                      </div>
                    ) : (
                      <div className="col mb-4">
                        <b>
                          Selected correct answer
                          {type === "Multiple correct choices" ? "s" : ""}
                        </b>
                        <br />
                        <input
                          type="text"
                          value={segmentAnswers}
                          style={{ width: "250px", height: "30px" }}
                          name="answers"
                          disabled
                        />
                      </div>
                    )}
                    <div className="col mb-4">
                      <b>Points (if answered correctly)</b>
                      <br />
                      <input
                        type="number"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.points}
                        min="0"
                        max="1000"
                        style={{ width: "250px", height: "30px" }}
                        name="points"
                      />
                    </div>
                  </div>
                )}
                {type === "HTML" ? (
                  <div className="row">
                    <div className="col mb-4">
                      <b>Data</b>
                      <br />
                      <CKEditor
                        onChange={(e) => setSegmentData(e.editor.getData())}
                        onBlur={(e) => setSegmentData(e.editor.getData())}
                        data={segmentData}
                        name="data"
                      />
                    </div>
                  </div>
                ) : null}
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
                  onClick={closeSegmentModal}
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
              {props.errors.name && <ErrorMessage error={props.errors.name} />}
              {props.errors.cat && <ErrorMessage error={props.errors.cat} />}
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}

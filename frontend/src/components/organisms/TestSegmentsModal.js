import React, { useState, useEffect } from "react";
import CKEditor from "ckeditor4-react";
import Modal from "react-modal";
import { Formik } from "formik";
import * as yup from "yup";

import { globalApiInstance } from "../../utils/api";

import { Heading } from "../atoms/Heading";
import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { ErrorMessage } from "../molecules/ErrorMessage";
import { Loading } from "../molecules/Loading";

export const moduleInfoSchema = yup.object().shape({
  name: yup.string().label("Name").required(),
  rqmt: yup.string().label("Correct answer(s)").required(),
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
  const [segmentData, setSegmentData] = useState(
    "<i>loading failed, close and try again</i>"
  );

  const closeSegmentModal = (isExit) => {
    setStatus(null);
    setMessage(null);
    setSegment(defaultSegment);
    setSegmentData("<i>loading failed, close and try again</i>");
    closeModal(isExit);
  };

  const saveSegment = (values) => {
    if (segmentData) {
      let segmentContent = segmentData;

      let newSegment = {
        name: values.name,
        sType: type,
        rqmt: type === "HTML" ? "0" : values.rqmt,
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
        setStatus("loading");
        globalApiInstance
          .post(process.env.REACT_APP_BASE_API + "modules/getSegment", {
            moduleId: moduleId,
            segmentId: segmentId,
          })
          .then((res) => {
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
                {type === "Short Answer" ? (
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
                      />
                    </div>
                  </div>
                ) : null}
                {type === "HTML" ? null : (
                  <div className="row">
                    {type === "Short Answer" ? (
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
                        <b>Required time (in minutes)</b>
                        <br />
                        <input
                          type="number"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.rqmt}
                          min="0"
                          max="1440"
                          style={{ width: "250px", height: "30px" }}
                          name="rqmt"
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
                  className={"btn btn-danger ml-2 mr-2 "}
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
              {props.errors.rqmt && <ErrorMessage error={props.errors.rqmt} />}
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}

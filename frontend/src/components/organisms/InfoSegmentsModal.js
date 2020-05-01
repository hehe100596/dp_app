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
});

export function InfoSegmentsModal({ segmentId, moduleId, type, closeModal }) {
  // TODO: Add other info segment types!

  const defaultSegment = {
    name: "",
    rqmt: "0",
    points: 0,
  };

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(null);
  const [segment, setSegment] = useState(defaultSegment);
  const [segmentData, setSegmentData] = useState(null);

  const closeSegmentModal = (isExit) => {
    setStatus("loading");
    setMessage(null);
    setSegment(defaultSegment);
    setSegmentData(null);
    closeModal(isExit);
  };

  const saveSegment = (values) => {
    setStatus("loading");

    if (segmentData) {
      let newSegment = {
        name: values.name,
        sType: type,
        rqmt: values.rqmt,
        points: values.points,
        data: segmentData,
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
      setMessage("Data is a required field");
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
          {segmentId === "new" ? "ADD INFO SEGMENT" : "EDIT INFO SEGMENT"}
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
                    <b>Type (next to "Add" button)</b>
                    <br />
                    <input
                      type="text"
                      value={props.values.sType}
                      style={{ width: "250px", height: "30px" }}
                      name="sType"
                      placeholder="type"
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
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
                  <div className="col mb-4">
                    <b>Points (if requirement is met)</b>
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
                <div
                  className="row justify-content-md-center"
                  style={{ width: "555px" }}
                >
                  <p>
                    <i>
                      Required time determines how many minutes your student
                      must spend on this module in order to get the set number
                      of points (0 means none).
                    </i>
                  </p>
                </div>
                <div className="row">
                  {type === "HTML" ? (
                    <div className="col mb-4">
                      <b>Data</b>
                      <br />
                      {segmentData || segmentId === "new" ? (
                        <CKEditor
                          onChange={(e) => setSegmentData(e.editor.getData())}
                          onBlur={(e) => setSegmentData(e.editor.getData())}
                          data={segmentData}
                          name="data"
                        />
                      ) : null}
                    </div>
                  ) : (
                    <div className="col mb-4">
                      <b>Embedded Video Link</b>
                      <br />
                      <textarea
                        onChange={(e) => setSegmentData(e.target.value)}
                        onBlur={(e) => setSegmentData(e.target.value)}
                        value={segmentData}
                        style={{ width: "555px", height: "150px" }}
                        name="data"
                      />
                    </div>
                  )}
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
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}

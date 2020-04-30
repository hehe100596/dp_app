import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";

import { useAuth } from "../../utils/auth";
import { globalApiInstance } from "../../utils/api";

import { Heading } from "../atoms/Heading";
import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { ServerStatus } from "../organisms/ServerStatus";
import { ModuleDetail } from "../templates/ModuleDetail";

export function SectionPage(props) {
  const [points, setPoints] = useState(0);
  const [tab, setTab] = useState();
  const [section, setSection] = useState([]);
  const [index, setIndex] = useState(0);

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(null);

  const auth = useAuth();

  const addPoints = (value) => {
    setPoints(points + value);
  };

  const finish = () => {
    let finalPoints = section.rewardPoints;
    if (section.rewardMargin !== 0) {
      finalPoints = (points * section.rewardMargin).toFixed(0);
    }

    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "users/saveProgress", {
        user: auth.token,
        course: props.match.params.course,
        section: props.match.params.section,
        points: finalPoints,
      })
      .then((res) => {
        setTab("redirect");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message);
      });
  };

  const retry = () => {
    setStatus("idle");
    setPoints(0);
    setIndex(0);
    setTab("start");
  };

  const changeTab = () => {
    if (index < section.modules.length - 1) {
      setIndex(index + 1);
    } else {
      setTab("end");
    }
  };

  useEffect(() => {
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "courses/getSection", {
        courseId: props.match.params.course,
        sectionId: props.match.params.section,
      })
      .then((res) => {
        if (res.data.data) {
          setSection(res.data.data);
          setTab("start");
          setStatus("success");
        }
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message);
      });
  }, [props.match.params.course, props.match.params.section]);

  if (tab === "redirect")
    return (
      <Redirect
        push
        to={{ pathname: `/enter-course/${props.match.params.course}` }}
      />
    );

  return (
    <div align="center">
      {tab === "start" ? (
        <ModuleDetail
          moduleId={section.modules[index]}
          addPoints={addPoints}
          changeTab={changeTab}
        />
      ) : tab === "end" ? (
        <>
          <Heading level="2">CONGRATULATIONS!</Heading>
          <EmptyLine level="1" />
          <p>
            You got{" "}
            <b>
              {section.rewardMargin !== 0
                ? (points * section.rewardMargin).toFixed(0)
                : section.rewardPoints}
            </b>{" "}
            point(s) out of <b>{section.rewardPoints}</b>!
          </p>
          <EmptyLine level="2" />
          <Button
            className={"btn btn-success ml-2 mr-2"}
            style={{ width: "200px" }}
            type="button"
            onClick={finish}
          >
            <b>Finish</b>
          </Button>
          <Button
            className={"btn btn-info ml-2 mr-2"}
            style={{ width: "200px" }}
            type="button"
            onClick={retry}
          >
            <b>Retry</b>
          </Button>
        </>
      ) : null}
      <EmptyLine level="1" />
      <ServerStatus status={status} message={message} />
    </div>
  );
}
import React, { useState, useEffect, useRef } from "react";
import parse from "html-react-parser";

import { globalApiInstance } from "../../utils/api";

import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { Timer } from "../molecules/Timer";
import { ServerStatus } from "../organisms/ServerStatus";

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function ModuleDetail({ moduleId, addPoints, changeTab }) {
  const [content, setContent] = useState([]);
  const [type, setType] = useState(null);
  const [limit, setLimit] = useState(null);
  const [view, setView] = useState(null);
  const [timer, setTimer] = useState(0);

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(null);

  const parseContent = (moduleType, contentToParse) => {
    if (moduleType === "Info") {
      let parsedContent = "";

      contentToParse.forEach(function(entry) {
        parsedContent += entry.data;
        parsedContent += "<br/>";
      });

      setView(parsedContent);
    } else {
      // TODO: Add test functionality!
    }
  };

  const finishModule = () => {
    let contentPoints = 0;

    if (type === "Info") {
      content.forEach(function(entry) {
        if (timer >= entry.rqmt * 60) {
          contentPoints += entry.points;
        }
      });
    } else {
      // TODO: Add test functionality!
    }

    addPoints(contentPoints);
    changeTab("results");
  };

  useInterval(() => {
    setTimer(timer + 1);
    if (limit !== 0 && timer >= limit * 60) {
      finishModule();
    }
  }, 1000);

  useEffect(() => {
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "modules/getModule", {
        module: moduleId
      })
      .then(res => {
        setType(res.data.data.type);
        setLimit(res.data.data.limit);
        setContent(res.data.data.content);
        parseContent(res.data.data.type, res.data.data.content);
        setStatus("success");
      })
      .catch(err => {
        setStatus("error");
        setMessage(err.message);
      });
  }, [moduleId]);

  return (
    <div align="center">
      <Timer seconds={timer} />
      <EmptyLine level="1" />
      {view ? (
        parse(view)
      ) : (
        <>
          This module contains no content
          <EmptyLine level="1" />
        </>
      )}
      <ServerStatus status={status} message={message} />
      <EmptyLine level="1" />
      <Button
        className={"btn btn-success"}
        style={{ width: "200px" }}
        type="button"
        onClick={finishModule}
        disabled={type === null}
      >
        <b>Next</b>
      </Button>
    </div>
  );
}

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

  const formatAnswer = (answer) => {
    let formattedAnswer = answer.toUpperCase();
    formattedAnswer = formattedAnswer.replace(/\s/g, "");

    return formattedAnswer;
  };

  const parseContent = (contentToParse) => {
    let counter = 1;
    let parsedContent = "";

    contentToParse.forEach(function (entry) {
      if (entry.sType === "HTML") {
        parsedContent += entry.data;
        parsedContent += "<br/>";
      } else if (entry.sType === "Short Answer") {
        parsedContent += "<b>" + counter + ". " + entry.data + "</b><br/>";
        parsedContent +=
          "<input style='width:250px;' id='question-" + counter + "' />";
        parsedContent += "<br/><br/>";
        counter += 1;
      }
    });

    setView(parsedContent);
  };

  const finishModule = () => {
    let contentPoints = 0;

    if (type === "Info") {
      content.forEach(function (entry) {
        if (timer >= entry.rqmt * 60) {
          contentPoints += entry.points;
        }
      });
    } else {
      let counter = 1;

      content.forEach(function (entry) {
        if (entry.sType !== "HTML") {
          let id = "question-" + counter;

          let correctAnswer = formatAnswer(entry.rqmt);
          let studentAnswer = formatAnswer(document.getElementById(id).value);

          if (correctAnswer === studentAnswer) {
            contentPoints += entry.points;
          }
          counter += 1;
        }
      });
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
        module: moduleId,
      })
      .then((res) => {
        setType(res.data.data.type);
        setLimit(res.data.data.limit);
        setContent(res.data.data.content);
        parseContent(res.data.data.content);
        setStatus("success");
      })
      .catch((err) => {
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

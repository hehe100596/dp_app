import React, { useState, useEffect, useRef } from "react";
import parse from "html-react-parser";

import { globalApiInstance } from "../../utils/api";

import { Button } from "../atoms/Button";
import { Heading } from "../atoms/Heading";
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
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [limit, setLimit] = useState(null);
  const [view, setView] = useState(null);
  const [timer, setTimer] = useState(null);
  const [clock, setClock] = useState(0);

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(null);

  const formatAnswer = (answer) => {
    let formattedAnswer = answer.toUpperCase();
    formattedAnswer = formattedAnswer.replace(/\s/g, "");

    return formattedAnswer;
  };

  const parseContent = (contentToParse, moduleType) => {
    let counter = 1;
    let parsedContent = "";

    contentToParse.forEach(function (entry) {
      if (entry.sType === "HTML" || entry.sType === "Video or media") {
        parsedContent += entry.data;
        parsedContent += "<br /><br />";
      } else if (entry.sType === "Text answer") {
        parsedContent += entry.data;
        parsedContent +=
          "<input style='width:250px;' id='question-" + counter + "' />";

        parsedContent += "<br /><br /><br />";
        counter += 1;
      } else {
        let iType = entry.sType === "One correct choice" ? "radio" : "checkbox";
        let question = entry.data.split(";;;")[0];
        let choices = entry.data.split(";;;").slice(1, -1);

        parsedContent += question;
        parsedContent += "<div style='display: inline-block;' align='left'>";

        if (entry.rnd) {
          for (var i = choices.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = choices[i];
            choices[i] = choices[j];
            choices[j] = tmp;
          }
        }

        choices.forEach(function (entry) {
          parsedContent += "<input type='" + iType + "' id='" + entry;
          parsedContent +=
            "' name='question-" + counter + "' /> " + entry + "<br />";
        });

        parsedContent += "<br /><br />";
        counter += 1;
      }
    });

    if (parsedContent) {
      let allParsedContent = "<div align='center'>";
      if (moduleType === "Test") {
        allParsedContent =
          "<div style='display: inline-block;max-width: 75%;' align='left'>";
      }
      allParsedContent += parsedContent;
      allParsedContent += "</div>";
      setView(allParsedContent);
    }
  };

  const finishModule = () => {
    let contentPoints = 0;

    if (type === "Info") {
      content.forEach(function (entry) {
        if (clock >= entry.rqmt * 60) {
          contentPoints += entry.points;
        }
      });
    } else {
      let counter = 1;

      content.forEach(function (entry) {
        if (entry.sType !== "HTML") {
          let id = "question-" + counter;

          if (entry.sType === "Text answer") {
            let correctAnswer = formatAnswer(entry.rqmt);
            let studentAnswer = formatAnswer(document.getElementById(id).value);

            if (correctAnswer === studentAnswer) {
              contentPoints += entry.points;
            }
          } else {
            let answers = entry.rqmt.split(";;;").slice(0, -1);
            let checkboxes = document.getElementsByName(id);
            let selected = Array.prototype.slice
              .call(checkboxes)
              .filter((ch) => ch.checked === true);

            if (entry.sType === "One correct choice") {
              if (selected[0] && answers[0] && selected[0].id === answers[0]) {
                contentPoints += entry.points;
              }
            } else {
              let points = 0;

              if (answers.length === 0) {
                points =
                  entry.points -
                  (selected.length / checkboxes.length) * entry.points;
              } else {
                let checkboxesHit = 0;

                selected.forEach(function (entry) {
                  if (answers.includes(entry.id)) {
                    checkboxesHit += 1;
                  } else {
                    checkboxesHit -= 1;
                  }
                });

                points = (checkboxesHit / answers.length) * entry.points;
                points = points < 0 ? 0 : points;
              }

              contentPoints += points;
            }
          }

          counter += 1;
        }
      });
    }

    addPoints(contentPoints);
    changeTab("results");
  };

  useInterval(() => {
    if (document.hasFocus() || timer === "Countdown") setClock(clock + 1);
    if (limit !== null && limit !== 0 && clock >= limit * 60) {
      finishModule();
    }
  }, 1000);

  useEffect(() => {
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "modules/getModule", {
        module: moduleId,
      })
      .then((res) => {
        setName(res.data.data.name);
        setType(res.data.data.type);
        setLimit(res.data.data.limit);
        setTimer(res.data.data.timer);
        setContent(res.data.data.content);
        parseContent(res.data.data.content, res.data.data.type);
        setStatus("success");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message);
      });
  }, [moduleId]);

  return (
    <div align="center">
      <div className="w-75">
        <Timer name={name} timer={timer} limit={limit} seconds={clock} />
      </div>
      {view ? (
        parse(view)
      ) : (
        <>
          <Heading level="2">This module contains no content</Heading>
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

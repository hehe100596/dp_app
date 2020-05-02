import React from "react";
import moment from "moment";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";

export function Timer({ timer, limit, seconds }) {
  if (timer === "Clock") {
    let day = moment.duration({ s: seconds });
    let time = moment().startOf("day").add(day).format("HH:mm:ss");

    return (
      <>
        <div className="alert alert-info" style={{ width: "200px" }}>
          <Heading level="4">{time}</Heading>
        </div>
        <EmptyLine level="1" />
      </>
    );
  }

  if (timer === "Countdown") {
    let day = moment.duration({ s: limit * 60 - seconds });
    let time = moment().startOf("day").add(day).format("HH:mm:ss");

    return (
      <>
        <div className="alert alert-danger" style={{ width: "200px" }}>
          <Heading level="4">{time}</Heading>
        </div>
        <EmptyLine level="1" />
      </>
    );
  }

  return null;
}

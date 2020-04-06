import React from "react";
import moment from "moment";

import { Heading } from "../atoms/Heading";

export function Timer({ seconds }) {
  let day = moment.duration({ s: seconds });
  let time = moment().startOf("day").add(day).format("HH:mm:ss");

  return (
    <div className="alert alert-info" style={{ width: "200px" }}>
      <Heading level="4">{time}</Heading>
    </div>
  );
}

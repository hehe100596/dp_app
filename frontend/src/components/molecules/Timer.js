import React from "react";
import moment from "moment";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";

export function Timer({ name, timer, limit, seconds }) {
  if (timer === "Clock") {
    let day = moment.duration({ s: seconds });
    let time = moment().startOf("day").add(day).format("HH:mm:ss");

    return (
      <>
        <div className="row border border-top-0 border-dark align-self-center">
          <div className="col alert alert-secondary align-self-center mt-3 ml-4 mr-4">
            <Heading level="4">
              <b>{name}</b>
            </Heading>
          </div>
          <div className="col alert alert-info align-self-center mt-3 ml-4 mr-4">
            <Heading level="4">{time}</Heading>
          </div>
        </div>
        <EmptyLine level="3" />
      </>
    );
  }

  if (timer === "Countdown") {
    let day = moment.duration({ s: limit * 60 - seconds });
    let time = moment().startOf("day").add(day).format("HH:mm:ss");

    return (
      <>
        <div className="row border border-top-0 border-dark align-self-center">
          <div className="col alert alert-secondary align-self-center mt-3 ml-4 mr-4">
            <Heading level="4">
              <b>{name}</b>
            </Heading>
          </div>
          <div className="col alert alert-danger align-self-center mt-3 ml-4 mr-4">
            <Heading level="4">{time}</Heading>
          </div>
        </div>
        <EmptyLine level="3" />
      </>
    );
  }

  return (
    <>
      <div className="row border border-top-0 border-dark align-self-center">
        <div className="col alert alert-secondary align-self-center mt-3 ml-4 mr-4">
          <Heading level="4">
            <b>{name}</b>
          </Heading>
        </div>
      </div>
      <EmptyLine level="3" />
    </>
  );
}

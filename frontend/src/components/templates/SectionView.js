import React from "react";
import { Link } from "react-router-dom";

import { Heading } from "../atoms/Heading";
import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";

export function SectionView({ course, section, name, maxPoints, points }) {
  return (
    <div align="center">
      <EmptyLine level="1" />
      <Heading level="2">{name}</Heading>
      <EmptyLine level="1" />
      <p>
        You currently have <b>{points}</b> out of <b>{maxPoints}</b> points!
      </p>
      <p className="text-danger">
        <b>
          <i>* Your progress is not saved until you finish a whole section</i>
        </b>
        <br />
        {points > 0 ? (
          <b>
            <i>* Your current progress will be rewritten</i>
          </b>
        ) : null}
      </p>
      <EmptyLine level="1" />
      <Link to={{ pathname: `/enter-course/${course}/${section}` }}>
        <Button
          className={"btn btn-warning"}
          style={{ width: "200px" }}
          type="button"
        >
          <b>Start</b>
        </Button>
      </Link>
      <EmptyLine level="1" />
    </div>
  );
}

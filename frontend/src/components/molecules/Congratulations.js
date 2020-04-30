import React from "react";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { FontIcon } from "../atoms/FontIcon";

export function Congratulations({ name, counter }) {
  return (
    <div align="center">
      <FontIcon icon="thumbs-up" className="fa-5x text-success" />
      <EmptyLine level="1" />
      <Heading level="4">Congratulations!</Heading>
      <EmptyLine level="1" />
      <p>
        You have successfully unlocked all sections of <b>{name}</b>!<br />
        Finish the last section to complete this course!
      </p>
    </div>
  );
}

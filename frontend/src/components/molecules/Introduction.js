import React from "react";

import { Heading } from "../atoms/Heading";
import { FontIcon } from "../atoms/FontIcon";
import { EmptyLine } from "../atoms/EmptyLine";

export function Introduction() {
  return (
    <div align="center">
      <Heading level="1">
        <FontIcon icon="graduation-cap" /> E-MAKE
      </Heading>
      <EmptyLine level="2" />
      <Heading level="2">Welcome to E-MAKE</Heading>
      <EmptyLine level="1" />
      <div align="center" className="mb-2">
        <p className="mt-2 mb-2">
          <b>With this application, you can quickly and easily:</b>
        </p>
        <li>Create and manage your own online e-learning courses</li>
        <li>Invite other users to your courses and watch their progress</li>
        <li>Take online e-learning courses created by other users</li>
      </div>
    </div>
  );
}

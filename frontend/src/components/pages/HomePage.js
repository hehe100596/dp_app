import React from "react";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { GetStarted } from "../templates/GetStarted";

export function HomePage() {
  return (
    <div align="center">
      <Heading level="1">GET STARTED</Heading>
      <EmptyLine level="2" />
      <p className="mb-5">
        This page is meant to show you what you can do with <b>E-MAKE</b>.
      </p>
      <hr style={{ width: "600px", background: "black" }} />
      <EmptyLine level="2" />
      <GetStarted />
    </div>
  );
}

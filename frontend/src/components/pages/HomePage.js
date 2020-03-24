import React from "react";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";

export function HomePage() {
  return (
    <div align="center">
      <Heading level="1">WELCOME</Heading>
      <EmptyLine level="1" />
      <p>TODO: Add tutorial</p>
    </div>
  );
}

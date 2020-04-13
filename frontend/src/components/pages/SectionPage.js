import React from "react";

import { Heading } from "../atoms/Heading";

export function SectionPage(props) {
  return (
    <div align="center">
      <Heading level="2">SECTION</Heading>
      <br />
      Course: {props.match.params.course}
      <br />
      Section: {props.match.params.section}
    </div>
  );
}

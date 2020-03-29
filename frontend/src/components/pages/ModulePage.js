import React from "react";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { ModuleDetail } from "../templates/ModuleDetail";

export function ModulePage(props) {
  return (
    <div align="center">
      <Heading level="1">MODULE</Heading>
      <EmptyLine level="2" />
      <ModuleDetail moduleId={props.match.params.module} />
    </div>
  );
}

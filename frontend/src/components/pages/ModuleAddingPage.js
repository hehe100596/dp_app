import React from "react";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { ModuleModification } from "../templates/ModuleModification";

export function ModuleAddingPage() {
  return (
    <div align="center">
      <Heading level="1">NEW MODULE</Heading>
      <EmptyLine level="2" />
      <ModuleModification moduleId={null} />
    </div>
  );
}

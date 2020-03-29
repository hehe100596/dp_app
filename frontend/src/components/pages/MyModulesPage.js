import React from "react";

import { Heading } from "../atoms/Heading";
import { ModulesTable } from "../templates/ModulesTable";

export function MyModulesPage() {
  return (
    <div align="center">
      <Heading level="1">MY MODULES</Heading>
      <br />
      <ModulesTable
        isEditable={true}
        noModulesMessage="You have not created any modules yet."
      />
    </div>
  );
}

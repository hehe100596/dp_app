import React from "react";

import { Heading } from "../atoms/Heading";
import { ModulesTable } from "../templates/ModulesTable";

export function ModulesPage() {
  return (
    <div align="center">
      <Heading level="1">ALL MODULES</Heading>
      <br />
      <ModulesTable
        isEditable={false}
        noCoursesMessage="You have access to 0 modules."
      />
    </div>
  );
}

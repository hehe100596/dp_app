import React from "react";

import { Heading } from "../atoms/Heading";
import { CoursesTable } from "../templates/CoursesTable";

export function CoursesPage() {
  return (
    <div align="center">
      <Heading level="1">ALL COURSES</Heading>
      <br />
      <CoursesTable
        isEditable={false}
        noCoursesMessage="You have access to 0 courses"
      />
    </div>
  );
}

import React from "react";

import { Heading } from "../atoms/Heading";
import { CoursesTable } from "../templates/CoursesTable";

export function MyCoursesPage() {
  return (
    <div align="center">
      <Heading level="1">MY COURSES</Heading>
      <br />
      <CoursesTable
        isEditable={true}
        noCoursesMessage="You have not created any courses yet."
      />
    </div>
  );
}

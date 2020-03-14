import React from "react";

import { CoursesTable } from "../templates/CoursesTable";

export function CoursesPage() {
  return (
    <CoursesTable
      isEditable={false}
      noCoursesMessage="You have access to 0 courses."
    />
  );
}

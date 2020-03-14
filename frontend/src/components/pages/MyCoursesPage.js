import React from "react";

import { CoursesTable } from "../templates/CoursesTable";

export function MyCoursesPage() {
  return (
    <CoursesTable
      isEditable={true}
      noCoursesMessage="You have not created any courses yet."
    />
  );
}

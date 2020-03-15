import React from "react";

export function CourseModification({ courseId }) {
  return (
    <div align="center">
      ---
      {courseId ? courseId : "new_id"}
      ---
    </div>
  );
}

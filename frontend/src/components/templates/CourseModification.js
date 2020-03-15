import React from "react";

export function CourseModification({ courseId }) {
  // TODO: Confirm user really has access to this course!

  return (
    <div align="center">
      ---
      {courseId ? courseId : "new_id"}
      ---
    </div>
  );
}

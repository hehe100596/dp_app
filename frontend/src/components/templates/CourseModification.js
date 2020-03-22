import React from "react";

export function CourseModification({ courseId }) {
  // TODO: Confirm user really has access to this course!

  return (
    <div align="center">
      {courseId ? courseId : "new_id"}
      <div className="container">
        <div className="row">
          <div className="col-sm">One of three columns</div>
          <div className="col-sm">One of three columns</div>
          <div className="col-sm">One of three columns</div>
        </div>
      </div>
    </div>
  );
}

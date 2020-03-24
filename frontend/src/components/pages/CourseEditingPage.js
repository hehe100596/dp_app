import React from "react";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { CourseModification } from "../templates/CourseModification";
import { CourseStudents } from "../templates/CourseStudents";

export function CourseEditingPage(props) {
  return (
    <div align="center">
      <Heading level="1">EDIT COURSE {null}</Heading>
      <EmptyLine level="2" />
      <b>
        <p className="text-danger">
          Make sure to save your changes on all tabs separately!
        </p>
      </b>
      <EmptyLine level="2" />
      <nav>
        <div
          className="nav nav-tabs justify-content-center"
          id="nav-tab"
          role="tablist"
        >
          <a
            className="nav-item nav-link active"
            id="info-tab"
            data-toggle="tab"
            href="#info"
            role="tab"
            aria-controls="info"
            aria-selected="true"
          >
            Course info
          </a>
          <a
            className="nav-item nav-link"
            id="students-tab"
            data-toggle="tab"
            href="#students"
            role="tab"
            aria-controls="students"
            aria-selected="false"
          >
            Students
          </a>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="info"
          role="tabpanel"
          aria-labelledby="info-tab"
        >
          <EmptyLine level="2" />
          <CourseModification courseId={props.match.params.course} />
        </div>
        <div
          className="tab-pane fade"
          id="students"
          role="tabpanel"
          aria-labelledby="students-tab"
        >
          <CourseStudents courseId={props.match.params.course} />
        </div>
      </div>
    </div>
  );
}

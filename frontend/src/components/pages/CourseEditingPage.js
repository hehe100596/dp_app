import React from "react";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { CourseModification } from "../templates/CourseModification";
import { CourseStudents } from "../templates/CourseStudents";
import { CourseContent } from "../templates/CourseContent";

export function CourseEditingPage(props) {
  return (
    <div align="center">
      <Heading level="1">EDIT COURSE</Heading>
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
          <a
            className="nav-item nav-link"
            id="content-tab"
            data-toggle="tab"
            href="#content"
            role="tab"
            aria-controls="content"
            aria-selected="false"
          >
            Course content
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
          <p className="text-danger">
            <b>
              <i>
                * If you want your changes to be saved, remember to click on
                save button
              </i>
            </b>
          </p>
          <EmptyLine level="1" />
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
        <div
          className="tab-pane fade"
          id="content"
          role="tabpanel"
          aria-labelledby="content-tab"
        >
          <CourseContent
            courseId={props.match.params.course}
            changeTab={null}
          />
        </div>
      </div>
    </div>
  );
}

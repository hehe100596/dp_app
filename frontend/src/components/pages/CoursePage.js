import React from "react";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { CourseDetail } from "../templates/CourseDetail";

export function CoursePage(props) {
  return (
    <div align="center">
      <Heading level="1">COURSE {null}</Heading>
      <EmptyLine level="2" />
      <CourseDetail courseId={props.match.params.course} />
    </div>
  );
}

import React from "react";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { CourseModification } from "../templates/CourseModification";

export function CourseEditingPage(props) {
  return (
    <div align="center">
      <Heading level="1">EDIT COURSE {null}</Heading>
      <EmptyLine level="2" />
      <CourseModification courseId={props.match.params.course} />
    </div>
  );
}

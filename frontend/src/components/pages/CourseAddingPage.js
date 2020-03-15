import React from "react";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { CourseModification } from "../templates/CourseModification";

export function CourseAddingPage() {
  return (
    <div align="center">
      <Heading level="1">NEW COURSE</Heading>
      <EmptyLine level="2" />
      <CourseModification courseId={null} />
    </div>
  );
}

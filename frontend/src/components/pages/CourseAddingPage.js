import React, { useState } from "react";
import { Redirect } from "react-router";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { CourseModification } from "../templates/CourseModification";
import { CourseContent } from "../templates/CourseContent";

export function CourseAddingPage() {
  const [tab, setTab] = useState("info");

  const changeTab = (newTab) => {
    setTab(newTab);
  };

  if (tab === "redirect") return <Redirect push to="/my-courses" />;

  return (
    <div align="center">
      <Heading level="1">NEW COURSE</Heading>
      <EmptyLine level="2" />
      {tab === "info" ? (
        <CourseModification courseId={null} changeTab={changeTab} />
      ) : (
        <CourseContent courseId={tab} changeTab={changeTab} />
      )}
    </div>
  );
}

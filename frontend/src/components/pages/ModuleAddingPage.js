import React, { useState } from "react";
import { Redirect } from "react-router";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { ModuleModification } from "../templates/ModuleModification";
import { ModuleContent } from "../templates/ModuleContent";

export function ModuleAddingPage() {
  const [tab, setTab] = useState("info");

  const changeTab = newTab => {
    setTab(newTab);
  };

  if (tab === "redirect") return <Redirect push to="/my-modules" />;

  return (
    <div align="center">
      <Heading level="1">NEW MODULE</Heading>
      <EmptyLine level="2" />
      {tab === "info" ? (
        <ModuleModification moduleId={null} changeTab={changeTab} />
      ) : (
        <ModuleContent moduleId={tab} changeTab={changeTab} />
      )}
    </div>
  );
}

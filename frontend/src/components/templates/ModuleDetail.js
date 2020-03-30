import React from "react";

import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";

export function ModuleDetail({ moduleId, addPoints, changeTab }) {
  // TODO: Add module content viewing!

  const finishModule = () => {
    changeTab("results");
  };

  return (
    <div align="center">
      ---
      <EmptyLine level="2" />
      <Button
        className={"btn btn-success"}
        style={{ width: "200px" }}
        type="button"
        onClick={finishModule}
      >
        <b>Next</b>
      </Button>
    </div>
  );
}

import React, { useState } from "react";

import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { ModuleDetail } from "../templates/ModuleDetail";

export function ModulePage(props) {
  const [points, setPoints] = useState(0);
  const [tab, setTab] = useState("module");

  const addPoints = value => {
    setPoints(points + value);
  };

  const retry = () => {
    setPoints(0);
    changeTab("module");
  };

  const changeTab = newTab => {
    setTab(newTab);
  };

  return (
    <div align="center">
      {tab === "module" ? (
        <ModuleDetail
          moduleId={props.match.params.module}
          addPoints={addPoints}
          changeTab={changeTab}
        />
      ) : (
        <>
          <b>You got {points} points!</b>
          <EmptyLine level="2" />
          <Button
            className={"btn btn-warning"}
            style={{ width: "200px" }}
            type="button"
            onClick={retry}
          >
            <b>Retry</b>
          </Button>
        </>
      )}
    </div>
  );
}

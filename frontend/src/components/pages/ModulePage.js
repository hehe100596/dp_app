import React, { useState } from "react";

import { Heading } from "../atoms/Heading";
import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { ModuleDetail } from "../templates/ModuleDetail";

export function ModulePage(props) {
  const [points, setPoints] = useState(0);
  const [tab, setTab] = useState("module");

  const addPoints = value => {
    setPoints(points + value);
  };

  const changeTab = newTab => {
    setTab(newTab);
  };

  return (
    <div align="center">
      <Heading level="1">MODULE</Heading>
      <EmptyLine level="2" />
      {tab === "module" ? (
        <ModuleDetail
          moduleId={props.match.params.module}
          addPoints={addPoints}
          changeTab={changeTab}
        />
      ) : (
        <>
          <p>You got {points} points!</p>
          <EmptyLine level="2" />
          <Button
            className={"btn btn-warning"}
            style={{ width: "200px" }}
            type="button"
            onClick={e => changeTab("module")}
          >
            <b>Retry</b>
          </Button>
        </>
      )}
    </div>
  );
}

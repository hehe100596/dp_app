import React from "react";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { ModuleModification } from "../templates/ModuleModification";
import { ModuleUsers } from "../templates/ModuleUsers";

export function ModuleEditingPage(props) {
  return (
    <div align="center">
      <Heading level="1">EDIT MODULE</Heading>
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
            Module info
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
            Users with access
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
          <ModuleModification moduleId={props.match.params.module} />
        </div>
        <div
          className="tab-pane fade"
          id="students"
          role="tabpanel"
          aria-labelledby="students-tab"
        >
          <ModuleUsers moduleId={props.match.params.module} />
        </div>
      </div>
    </div>
  );
}

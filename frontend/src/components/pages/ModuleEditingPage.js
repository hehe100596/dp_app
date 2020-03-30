import React from "react";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { ModuleModification } from "../templates/ModuleModification";
import { ModuleUsers } from "../templates/ModuleUsers";
import { ModuleContent } from "../templates/ModuleContent";

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
            id="users-tab"
            data-toggle="tab"
            href="#users"
            role="tab"
            aria-controls="users"
            aria-selected="false"
          >
            Users with access
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
            Module content
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
          <ModuleModification
            moduleId={props.match.params.module}
            changeTab={null}
          />
        </div>
        <div
          className="tab-pane fade"
          id="users"
          role="tabpanel"
          aria-labelledby="users-tab"
        >
          <ModuleUsers moduleId={props.match.params.module} changeTab={null} />
        </div>
        <div
          className="tab-pane fade"
          id="content"
          role="tabpanel"
          aria-labelledby="content-tab"
        >
          <ModuleContent
            moduleId={props.match.params.module}
            changeTab={null}
          />
        </div>
      </div>
    </div>
  );
}

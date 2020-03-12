import React from "react";

import { EmptyLine } from "../atoms/EmptyLine";
import { PageFooter } from "../molecules/PageFooter";
import { TopNavBar } from "../molecules/TopNavBar";

export const PageWrapper = ({ children }) => (
  <div style={{ height: "100%" }}>
    <TopNavBar />
    <EmptyLine level="1" />
    {children}
    <EmptyLine level="1" />
    <PageFooter />
  </div>
);

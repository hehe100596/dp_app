import React from "react";

import { PageFooter } from "../molecules/PageFooter";
import { TopNavBar } from "../molecules/TopNavBar";

export const PageWrapper = ({ children }) => (
  <div style={{ height: "100%" }}>
    <TopNavBar />
    {children}
    <PageFooter />
  </div>
);

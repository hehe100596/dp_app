import React from "react";

import { useAuth } from "../../utils/auth";

import { EmptyLine } from "../atoms/EmptyLine";
import { PageFooter } from "../molecules/PageFooter";
import { TopNavBar } from "../molecules/TopNavBar";

export function PageWrapper({ children, isPrivate }) {
  const auth = useAuth();

  return (
    <div style={{ height: "100%" }}>
      <TopNavBar isPrivate={auth.token} />
      <EmptyLine level="1" />
      {children}
      <EmptyLine level="1" />
      <PageFooter />
    </div>
  );
}

import React from "react";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { Introduction } from "../molecules/Introduction";
import { SignInForm } from "../templates/SignInForm";

export function SignInPage() {
  return (
    <div align="center">
      <Introduction />
      <EmptyLine level="1" />
      <hr style={{ width: "400px", background: "black" }} />
      <EmptyLine level="1" />
      <Heading level="2">Sign in to proceed</Heading>
      <EmptyLine level="1" />
      <SignInForm />
    </div>
  );
}

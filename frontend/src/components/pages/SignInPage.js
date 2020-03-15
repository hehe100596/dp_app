import React from "react";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { SignInForm } from "../templates/SignInForm";

export function SignInPage() {
  return (
    <div align="center">
      <EmptyLine level="1" />
      <Heading level="1">Sign in</Heading>
      <EmptyLine level="1" />
      <SignInForm />
    </div>
  );
}

import React from "react";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { SignInForm } from "../templates/SignInForm";

export function SignInPage() {
  return (
    <div align="center">
      <Heading level="1">SIGN IN</Heading>
      <EmptyLine level="1" />
      <SignInForm />
    </div>
  );
}

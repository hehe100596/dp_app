import React from "react";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { Introduction } from "../molecules/Introduction";
import { RegisterForm } from "../templates/RegisterForm";

export function RegisterPage() {
  return (
    <div align="center">
      <Introduction />
      <EmptyLine level="1" />
      <hr style={{ width: "400px", background: "black" }} />
      <EmptyLine level="1" />
      <Heading level="2">Create your account</Heading>
      <EmptyLine level="1" />
      <RegisterForm />
    </div>
  );
}

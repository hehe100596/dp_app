import React from "react";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { RegisterForm } from "../templates/RegisterForm";

export function RegisterPage() {
  return (
    <div align="center">
      <Heading level="1">REGISTER</Heading>
      <EmptyLine level="1" />
      <RegisterForm />
    </div>
  );
}

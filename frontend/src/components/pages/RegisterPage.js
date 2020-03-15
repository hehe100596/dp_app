import React from "react";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { RegisterForm } from "../templates/RegisterForm";

export function RegisterPage() {
  return (
    <div align="center">
      <EmptyLine level="1" />
      <Heading level="1">Register</Heading>
      <EmptyLine level="1" />
      <RegisterForm />
    </div>
  );
}

import React from "react";

import { useAuth } from "../../utils/auth";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { ErrorMessage } from "../molecules/ErrorMessage";
import { SignInForm } from "../templates/SignInForm";
import { Invitation } from "../templates/Invitation";

export function InvitesPage(props) {
  const auth = useAuth();

  return auth.token ? (
    <div align="center">
      <Heading level="1">INVITATION LINK</Heading>
      <EmptyLine level="1" />
      <Invitation user={auth.token} link={props.match.params.link} />
    </div>
  ) : (
    <div align="center">
      <EmptyLine level="1" />
      <ErrorMessage error={"You must be signed in to proceed"} />
      <Heading level="1">Sign in</Heading>
      <EmptyLine level="1" />
      <SignInForm />
    </div>
  );
}

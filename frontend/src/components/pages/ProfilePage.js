import React from "react";

import { Heading } from "../atoms/Heading";
import { EmptyLine } from "../atoms/EmptyLine";
import { Profile } from "../templates/Profile";

export function ProfilePage() {
  return (
    <div align="center">
      <Heading level="1">MY PROFILE</Heading>
      <EmptyLine level="2" />
      <Profile />
    </div>
  );
}

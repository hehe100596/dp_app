import React from "react";

import { Alert } from "../atoms/Alert";
import { Heading } from "../atoms/Heading";
import { Paragraph } from "../atoms/Paragraph";

export const ErrorMessage = ({ title, error, variant }) => (
  <Alert variant={variant}>
    <Heading level="2">{title || ""}</Heading>
    <Paragraph>{`${error || ""}`}</Paragraph>
  </Alert>
);

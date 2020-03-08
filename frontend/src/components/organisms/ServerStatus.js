import React from "react";

import { ErrorMessage } from "../molecules/ErrorMessage";
import { Loading } from "../molecules/Loading";

export const ServerStatus = ({ status, message }) => (
  <div align="center">
    {status === "loading" ? (
      <Loading />
    ) : status === "error" ? (
      <ErrorMessage error={message} />
    ) : status === "success" ? (
      <ErrorMessage variant="success" error={message} />
    ) : null}
  </div>
);

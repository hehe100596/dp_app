import React from "react";

import { FontIcon } from "../atoms/FontIcon";

export const Loading = () => (
  <div className="text-center h1 text-muted p-5">
    <FontIcon icon="sync-alt" spin />
  </div>
);

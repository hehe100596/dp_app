import React from "react";

import { Heading } from "../atoms/Heading";

export function WelcomeMessage({ name, counter }) {
  return (
    <div align="center">
      <Heading level="4">Welcome to {name}!</Heading>
      <br />
      <p>
        This course has <b>{counter}</b> sections in total. Complete the last
        section to successfully finish this course!
      </p>
      <p className="text-danger">
        <b>
          <i>
            * If you cannot unlock any new sections, try getting better results
            in sections you currently have
          </i>
        </b>
      </p>
    </div>
  );
}

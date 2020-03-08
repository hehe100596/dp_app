import React from "react";

export const EmptyLine = ({ level, ...rest }) => {
  let number = level;
  let newLines = [];

  for (let i = 0; i < number; ++i) {
    newLines.push(<br />);
  }

  return <div>{newLines}</div>;
};

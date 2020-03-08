import React from "react";

import { EmptyLine } from "../atoms/EmptyLine";

export const PageFooter = () => {
  return (
    <div>
      <EmptyLine level="3" />
      <footer className="page-footer font-small bg-secondary text-white fixed-bottom">
        <div className="footer-copyright text-center py-3">
          <b>© 2020 Copyright</b>
        </div>
      </footer>
    </div>
  );
};

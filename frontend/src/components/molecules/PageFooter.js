import React from "react";

import { EmptyLine } from "../atoms/EmptyLine";

export const PageFooter = () => {
  const year = new Date().getFullYear();

  return (
    <div>
      <EmptyLine level="4" />
      <footer className="page-footer font-small bg-dark fixed-bottom border-top-0">
        <div className="footer-copyright text-center py-3">
          <b className="text-white">Copyright &copy; {year}</b>
        </div>
      </footer>
    </div>
  );
};

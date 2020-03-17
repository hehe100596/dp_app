import React from "react";
import { Offline, Online } from "react-detect-offline";

import { EmptyLine } from "../atoms/EmptyLine";

export const PageFooter = () => {
  return (
    <div>
      <EmptyLine level="4" />
      <Offline>
        <footer className="page-footer font-small bg-secondary text-white fixed-bottom">
          <div className="footer-copyright text-center py-3">
            <b>OFFLINE</b>
          </div>
        </footer>
      </Offline>
      <Online>
        <footer className="page-footer font-small bg-success text-white fixed-bottom">
          <div className="footer-copyright text-center py-3">
            <b>ONLINE</b>
          </div>
        </footer>
      </Online>
    </div>
  );
};

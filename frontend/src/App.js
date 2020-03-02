import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ApiProvider } from "./utils/api";
import { AuthProvider } from "./utils/auth";
import { AppRoutes } from "./AppRoutes";
import { ScrollToTop } from "./components/atoms/ScrollToTop";

// address: config.BASE_API, api: globalApiInstance
require("dotenv").config();

export function App() {
  return (
    <AuthProvider>
      <ApiProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
      </ApiProvider>
    </AuthProvider>
  );
}

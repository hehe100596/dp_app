import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef
} from "react";
import axios from "axios";

import { useAuth } from "./auth";

export const globalApiInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API
});

const ApiStateContext = createContext(globalApiInstance);

export function useApi() {
  return useContext(ApiStateContext);
}

export function ApiProvider({ children }) {
  const api = globalApiInstance;

  useSetAuthorizationHeader(api);
  useInstallSignoutApiInterceptror(api);

  return (
    <ApiStateContext.Provider value={api}>{children}</ApiStateContext.Provider>
  );
}

function useSetAuthorizationHeader(api) {
  const { token } = useAuth();

  useLayoutEffect(() => {
    if (!token) {
      delete api.defaults.headers.common["Authorization"];
    } else {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token, api]);
}

function useInstallSignoutApiInterceptror(api) {
  const { signout } = useAuth();
  const signoutRef = useRef(signout);

  useEffect(() => {
    signoutRef.current = signout;
  }, [signout]);

  useEffect(() => {
    const signoutInterceptr = api.interceptors.response.use(
      response => response,
      error => {
        const isInvalidTokenResponse =
          error && error.response && error.response.status === 401;

        if (isInvalidTokenResponse && signoutRef.current) {
          signoutRef.current();
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(signoutInterceptr);
    };
  }, [api]);
}

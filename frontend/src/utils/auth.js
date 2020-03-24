import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";

const LOCAL_STORAGE_AUTH_KEY = "dp-auth";

const initialState = {
  token: null,
  user: null,
  profile: null
};

const AuthContext = createContext(
  createContextValue({
    token: initialState.token,
    user: initialState.user,
    profile: initialState.profile,
    setState: () =>
      console.error("You are using AuthContext without AuthProvider!")
  })
);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [state, setState] = usePersistedAuth(initialState);

  const contextValue = useMemo(() => {
    const { token, user, profile } = state;
    return createContextValue({ token, user, profile, setState });
  }, [state, setState]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

function createContextValue({ token, user, profile, setState }) {
  return {
    token,
    user,
    profile,
    signin: ({ token, user, profile }) => setState({ token, user, profile }),
    signout: () =>
      setState({ token: null, user: null, profile: null }) &
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY)
  };
}

function usePersistedAuth(defaultState) {
  const [state, setStateRaw] = useState(() => getStorageState(defaultState));

  const setState = useCallback(newState => {
    setStateRaw(newState);
    setStorageState(newState);
  }, []);

  return [state, setState];
}

function getStorageState(defaultState) {
  if (!window.localStorage) {
    return defaultState;
  }

  const rawData = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
  if (!rawData) {
    return defaultState;
  }

  try {
    const { token, user, profile } = JSON.parse(rawData);

    if (token && user && profile) {
      return { token, user, profile };
    }
  } catch (e) {}

  return defaultState;
}

function setStorageState(newState) {
  if (!window.localStorage) {
    return;
  }

  window.localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(newState));
}

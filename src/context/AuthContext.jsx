import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext(null);
const initialState = { user: null, token: null, isAuthenticated: false, isLoading: false, error: "" };

export function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return { ...initialState, isLoading: true };
    case "LOGIN":
      return { user: action.payload.user, token: action.payload.token, isAuthenticated: true, isLoading: false, error: "" };
    case "LOGIN_ERROR":
      return { ...initialState, error: action.payload };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}

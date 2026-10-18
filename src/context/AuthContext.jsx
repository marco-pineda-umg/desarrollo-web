import { createContext, useContext, useEffect, useReducer } from "react";

const AuthContext = createContext(null);
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: "",
};

// Recupera la sesion guardada al recargar la pagina
function loadSession() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  if (!token || !user) return initialState;
  return { ...initialState, user, token, isAuthenticated: true };
}

export function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return { ...initialState, isLoading: true };
    case "LOGIN":
      return {
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: "",
      };
    case "LOGIN_ERROR":
      return { ...initialState, error: action.payload };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState, loadSession);

  useEffect(() => {
    if (state.token) {
      localStorage.setItem("token", state.token);
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [state.token, state.user]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ROLE, TOKEN, USER } from "../constants/LocalStorageKeys";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { t } from "i18next";

interface user_TP {
  id: number;
  name: string;
  phone: string;
  image: string;
}

interface initialState_TP {
  token: string | null;
  user: user_TP | null;
  role: null | string;
  setAuthData: (data: initialState_TP) => void;
  clearAuth: () => void;
}

const initialState: initialState_TP = {
  token: null,
  user: null,
  role: null,
  setAuthData: null,
  clearAuth: null,
};

const AuthContext = createContext<initialState_TP | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>(initialState.token);
  const [user, setUser] = useState<user_TP | null>(initialState.user);
  const [role, setRole] = useState<null | string>(initialState.role);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN) ?? "";
    const storedRole = localStorage.getItem(ROLE) ?? "";
    const storedUser = localStorage.getItem(USER);
    let user = null;
    if (storedUser) {
      try {
        user = JSON.parse(storedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }

    setToken(storedToken);
    setUser(user);
    setRole(storedRole);
  }, []);

  const setAuthData = (data: initialState_TP) => {
    setToken(data?.token);
    setUser(data?.user);
    setRole(data?.role);

    localStorage.setItem(TOKEN, data.token);
    localStorage.setItem(ROLE, data.role);
    localStorage.setItem(USER, JSON.stringify(data.user));
  };

  const clearAuth = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    localStorage.removeItem(ROLE);

    navigate("/");

    setTimeout(() => {
      toast.success(t("logout successful, see you later 👋"));
    }, 100);
  };

  const value: initialState_TP = { token, user, role, setAuthData, clearAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

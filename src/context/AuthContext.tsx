import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { TOKEN, USER } from "../constants/LocalStorageKeys";
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
  setAuthData: (data: initialState_TP) => void;
  clearAuth: () => void;
}

const initialState: initialState_TP = {
  token: null,
  user: null,
  setAuthData: null,
  clearAuth: null,
};

const AuthContext = createContext<initialState_TP | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>(initialState.token);
  const [user, setUser] = useState<user_TP | null>(initialState.user);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN) ?? "";
    const storedUser = localStorage.getItem(USER)
      ? JSON.parse(localStorage.getItem(USER)!)
      : null;

    setToken(storedToken);
    setUser(storedUser);
  }, []);

  const setAuthData = (data: initialState_TP) => {
    setToken(data?.token);
    setUser(data?.user);

    localStorage.setItem(TOKEN, data.token);
    localStorage.setItem(USER, JSON.stringify(data.user));
  };

  const clearAuth = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);

    navigate("/");

    setTimeout(() => {
      toast.success(t("logout successful, see you later 👋"));
    }, 100);
  };

  const value: initialState_TP = { token, user, setAuthData, clearAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

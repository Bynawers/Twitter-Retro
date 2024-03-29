import { useContext, createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

const BASE_URL = "https://api.twitter-retro.fr";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [user, setUser] = useState(localStorage.getItem("user") || "");

  const loginAction = async (data) => {
    const ERROR_MESSAGE = {
      401: "Unknow User, please retry",
      _: "Unknow Error",
    };

    try {
      await axios
        .post(`${BASE_URL}/auth/login`, data)
        .then((response) => {
          setUser(response.data.user);
          Cookies.set("token", response.data.token, { expires: 7 });
          setToken(response.data.token);
          localStorage.setItem("user", response.data.user);
          toast.success("Logged in successfully");
        })
        .catch((error) => {
          if (error.response) {
            toast.error(ERROR_MESSAGE[error.response.status]);
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    Cookies.remove("token");
    setToken("");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

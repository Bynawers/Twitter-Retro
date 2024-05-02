import { useContext, createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import twitterConfig from "../../twitterConfig.json";

import { getMe } from "../services/RequestUsers";

const AuthContext = createContext();

const BASE_URL = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL
  : twitterConfig.BASE_URL_ONLINE;

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );

  const getUserData = async () => {
    const data = await getMe();
    setUser(data);
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const loginAction = async (data) => {
    const ERROR_MESSAGE = {
      401: "Unknow User, please retry",
      _: "Unknow Error",
    };

    try {
      await axios
        .post(`${BASE_URL}/auth/login`, data)
        .then((response) => {
          const data = JSON.stringify(response.data.user);
          setUser(JSON.parse(data));
          Cookies.set("token", response.data.token, { expires: 7 });
          setToken(response.data.token);
          localStorage.setItem("user", data);
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
    setToken("");
    Cookies.remove("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loginAction,
        logOut,
        getUserData,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

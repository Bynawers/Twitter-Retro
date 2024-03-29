import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:3001";
//const BASE_URL = "https://api.twitter-retro.fr";
import Cookies from "js-cookie";

const getUsers = async (userId) => {
  const token = Cookies.get("token");

  try {
    const response = await axios.get(BASE_URL + "/users/" + userId, {
      headers: {
        Auth: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    throw error;
  }
};

const getMe = async (userId) => {
  const token = Cookies.get("token");

  try {
    const response = await axios.get(BASE_URL + "/users/me" + userId, {
      headers: {
        Auth: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    throw error;
  }
};

export { getUsers, getMe };

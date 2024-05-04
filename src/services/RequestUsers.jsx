import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

import twitterConfig from "../../twitterConfig.json";

const BASE_URL = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL
  : twitterConfig.BASE_URL_ONLINE;

const getUser = async (userId) => {
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

const getUserByTag = async (tag) => {
  const token = Cookies.get("token");

  try {
    const response = await axios.get(BASE_URL + "/users/by/tag/" + tag, {
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

const getUsers = async (ids) => {
  const token = Cookies.get("token");

  try {
    const response = await axios.get(BASE_URL + "/users/", {
      params: { ids },
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

const getMe = async () => {
  const token = Cookies.get("token");

  try {
    const response = await axios.get(BASE_URL + "/users/me", {
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

const setUser = async (formData) => {
  const token = Cookies.get("token");

  try {
    const response = await axios.patch(BASE_URL + "/users/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Auth: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const setBanner = async (formData) => {
  const token = Cookies.get("token");

  try {
    const response = await axios.post(BASE_URL + "/images/banner", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Auth: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const followUser = async (userId) => {
  const token = Cookies.get("token");

  try {
    const response = await axios.post(
      BASE_URL + "/users/" + userId + "/following",
      {},
      {
        headers: {
          Auth: `Bearer ${token}`,
        },
      }
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const unfollowUser = async (userId) => {
  const token = Cookies.get("token");

  try {
    const response = await axios.delete(
      BASE_URL + "/users/" + userId + "/following",
      {
        headers: {
          Auth: `Bearer ${token}`,
        },
      }
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export {
  getUser,
  getUsers,
  getMe,
  getUserByTag,
  setUser,
  setBanner,
  followUser,
  unfollowUser,
};

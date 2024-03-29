import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:3001";
//const BASE_URL = "https://api.twitter-retro.fr";

const signupUser = async (data) => {
  try {
    console.log(data);
    const response = await axios.post(BASE_URL + "/auth/register", data, {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
    });
    console.log(response);
    return true;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        return false;
      }
    }
    console.error(error);
    throw error;
  }
};

const checkEmail = async (email) => {
  try {
    await axios
      .post(
        BASE_URL + "/auth/check-email",
        { email: email },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
        }
      )
      .then(() => {
        return true;
      });
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        return false;
      }
    }
    console.error(error);
    throw error;
  }
};

const checkTag = async (tag) => {
  try {
    await axios
      .post(
        BASE_URL + "/auth/check-tag",
        { tag: tag },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
        }
      )
      .then(() => {
        return true;
      });
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        return false;
      }
    }
    console.error(error);
    throw error;
  }
};

export { signupUser, checkEmail, checkTag };

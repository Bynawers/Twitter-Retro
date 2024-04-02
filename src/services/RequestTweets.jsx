import axios from "axios";
import Cookies from "js-cookie";

//const BASE_URL = "https://api.twitter-retro.fr";
const BASE_URL = "http://localhost:3001";

const getTweets = async () => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get(BASE_URL + "/tweets", {
      headers: {
        Auth: token,
      },
    });
    //console.log(response.data.tweets);
    return response.data.tweets;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    throw error;
  }
};

const createTweet = async (data) => {
  const token = Cookies.get("token");
  console.log(data);
  try {
    const response = await axios.post(BASE_URL + "/tweets", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Auth: token,
      },
    });
    return true;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return false;
  }
};

const deleteTweet = async (id) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.delete(BASE_URL + "/tweets/" + id, {
      headers: {
        "Content-Type": "multipart/form-data",
        Auth: token,
      },
    });
    return true;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return false;
  }
};

export { getTweets, createTweet, deleteTweet };

import axios from "axios";
import Cookies from "js-cookie";
import twitterConfig from "../../twitterConfig.json";

const BASE_URL = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL
  : twitterConfig.BASE_URL_ONLINE;

const getChat = async () => {
  const token = Cookies.get("token");

  try {
    const response = await axios.get(BASE_URL + "/api/chat", {
      headers: {
        Auth: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user items:", error);
    return [];
  }
};

const getMessages = async (id) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get(BASE_URL + `/api/message/` + id, {
      headers: {
        Auth: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

const sendMessage = async (message, id) => {
  const token = Cookies.get("token");
  console.log(message);
  console.log(id);
  const response = await axios.post(
    BASE_URL + "/api/message",
    {
      content: message,
      chatId: id,
    },
    {
      headers: {
        "Content-type": "application/json",
        Auth: token,
      },
    }
  );
  console.log(response.data);
  return response.data;
};

export { getChat, getMessages, sendMessage };

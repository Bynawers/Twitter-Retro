import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

import Post from "../Post.jsx";
import { getTweets } from "../../services/RequestTweets.jsx";
import { getUsers } from "../../services/RequestUsers.jsx";
import { deleteTweet } from "../../services/RequestTweets";

import TooltipMoreDetails from "../tooltip/TooltipMoreDetails.jsx";

import { useAuth } from "../../hooks/AuthProvider";

function Suscription() {
  const [selectedPost, setSelectedPost] = useState([]);
  const [list, setList] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (tweets.length > 0) {
        return;
      }
      try {
        const data = await getTweets();
        setTweets(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tweets:", error);
      }
    };

    fetchData();
  }, [auth]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ids = tweets.map((obj) => obj.author._id);
        const uniqueIds = [...new Set(ids)];

        const data = await getUsers(uniqueIds);
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des users:", error);
      }
    };

    fetchData();
  }, [tweets]);

  useEffect(() => {
    const mergedList = tweets.map((tweet) => {
      const author = users.find((user) => user._id === tweet.author._id);
      return { ...tweet, author };
    });
    setList(mergedList);
  }, [users]);

  const handleDeleteTweet = async (id) => {
    if (await deleteTweet(id)) {
      toast.success("Tweet deleted successfully");
    } else {
      toast.error("An error has occurred");
    }
  };

  return (
    <div className="flex flex-col">
      <TooltipMoreDetails
        data={selectedPost}
        myTag={auth.user.tag}
        handleDeleteTweet={handleDeleteTweet}
      />
      {loading ? (
        <div className="flex justify-center items-center pt-10">
          <BeatLoader color={"#00ADED"} loading={true} size={10} />
        </div>
      ) : (
        list.map((elem, index) => {
          console.log(users);
          return (
            <React.Fragment key={index}>
              <Post data={elem} setSelectedPost={setSelectedPost} />
            </React.Fragment>
          );
        })
      )}
    </div>
  );
}

// <Post data={elem} setSelectedPost={setSelectedPost} />

export default Suscription;

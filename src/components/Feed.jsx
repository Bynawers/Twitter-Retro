import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

import Post from "./Post";
import twitterConfig from "../../twitterConfig.json";
import TooltipMoreDetails from "./tooltip/TooltipMoreDetails.jsx";
import ModalPhoto from "./modal/ModalPhoto.jsx";

import { getUsers } from "../services/RequestUsers";
import { getTweets, getTweetsPerIds } from "../services/RequestTweets.jsx";
import { deleteTweet } from "../services/RequestTweets.jsx";

import { useAuth } from "../hooks/AuthProvider";

const BASE_URL = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL + "/images"
  : twitterConfig.BASE_URL_ONLINE + "/images";

const Feed = (props) => {
  const auth = useAuth();

  const [modalPhoto, setModalPhoto] = useState(false);
  const [selectedPost, setSelectedPost] = useState([]);

  const [currentIds, setCurrentIds] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);

  const [once, setOnce] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingTweets, setLoadingTweets] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchTweets = async () => {
      if (tweets.length > 0) {
        return;
      }
      try {
        if (props.ids) {
          if (props.ids.length === 0) {
            return;
          }
          setOnce(true);
          setCurrentIds(props.ids);
          setTweets(await getTweetsPerIds(props.ids));
        } else {
          setOnce(true);
          setTweets(await getTweets());
        }
        setLoadingTweets(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des tweets:", error);
      }
    };

    if (tweets.length == 0 && !once) {
      fetchTweets();
    }
    if (compareLists()) {
      //console.log("Ids change"); // TODO Mettre à jour
    }
  }, [props.ids]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const ids = tweets.map((obj) => obj.author._id);
        const uniqueIds = [...new Set(ids)];

        const data = await getUsers(uniqueIds);
        setUsers(data);
        setLoadingUsers(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des users:", error);
      }
    };

    if (users.length == 0 && !loadingTweets) {
      fetchUsers();
    }
  }, [loadingTweets]);

  useEffect(() => {
    if (loadingTweets && loadingUsers) {
      return;
    }
    const mergedList = tweets.map((tweet) => {
      const author = users.find((user) => user._id === tweet.author._id);
      return { ...tweet, author };
    });

    props.setValue(mergedList);

    setLoading(false);
  }, [loadingUsers]);

  const compareLists = () => {
    if (!currentIds) {
      return;
    }

    const allIdsExist = currentIds.every((id) => props.ids.includes(id));

    return allIdsExist;
  };

  const openModalPhoto = () => {
    setModalPhoto(true);
  };

  const handleDeleteTweet = async (id) => {
    if (await deleteTweet(id)) {
      const updatedList = tweets.filter((item) => item._id !== id);
      setTweets(updatedList);
      toast.success("Tweet deleted successfully");
    } else {
      toast.error("An error has occurred");
    }
  };

  return (
    <div>
      <ModalPhoto
        modalIsOpen={modalPhoto}
        setModalIsOpen={setModalPhoto}
        selectPost={selectedPost}
      />
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
        <FeedView
          list={props.value}
          setSelectedPost={setSelectedPost}
          openModalPhoto={openModalPhoto}
        />
      )}
    </div>
  );
};

const FeedView = (props) => {
  return (
    <>
      {!props.list && <NothingFound />}
      {props.list &&
        props.list.map((elem, index) => {
          return (
            <React.Fragment key={index}>
              <Post data={elem} setSelectedPost={props.setSelectedPost} />
            </React.Fragment>
          );
        })}
    </>
  );
};

const NothingFound = () => {
  return <div>No Post found</div>;
};

export default Feed;

/*
Regarder si on peut aller vers une route inexistante qui ne sert qu'à ouvrir un modal
*/

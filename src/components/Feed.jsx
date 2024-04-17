import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

import Post from "./Post";
import TooltipMoreDetails from "./tooltip/TooltipMoreDetails.jsx";
import ModalPhoto from "./modal/ModalPhoto.jsx";

import { getUsers } from "../services/RequestUsers";
import { getTweets, getTweetsPerIds } from "../services/RequestTweets.jsx";
import { deleteTweet } from "../services/RequestTweets.jsx";

import { useAuth } from "../hooks/AuthProvider";
import { useProfile } from "../hooks/ProfileProvider";

const Feed = (props) => {
  const auth = useAuth();
  const { updateUser } = useAuth();

  const { removePostedTweet } = useProfile();

  const [modalPhoto, setModalPhoto] = useState(false);
  const [selectedPost, setSelectedPost] = useState([]);

  const openModalPhoto = () => {
    setModalPhoto(true);
  };

  const handleDeleteTweet = async (id) => {
    const response = await deleteTweet(id);

    if (response.status == 200) {
      const updatedUser = {
        ...auth.user,
        tweets: response.data.userTweets,
        stat: response.data.userStat,
      };
      updateUser(updatedUser);
      removePostedTweet(id);
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

      <FeedView
        list={props.value}
        setSelectedPost={setSelectedPost}
        openModalPhoto={openModalPhoto}
        handleModifyStat={props.handleModifyStat}
      />
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
              <Post
                data={elem}
                setSelectedPost={props.setSelectedPost}
                handleModifyStat={props.handleModifyStat}
              />
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

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import Post from "./Post";
import TooltipMoreDetails from "./tooltip/TooltipMoreDetails.jsx";
import ModalPhoto from "./modal/ModalPhoto.jsx";

import { deleteTweet } from "../services/RequestTweets.jsx";

import { useAuth } from "../hooks/AuthProvider";
import { useProfile } from "../hooks/ProfileProvider";
import { useScroll } from "../hooks/ScrollProvider";

const Feed = (props) => {
  const auth = useAuth();
  const scroll = useScroll();
  const { updateUser } = useAuth();

  const { removePostedTweet, nextPage } = useProfile();

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

  useEffect(() => {
    if (scroll.isScrollEnd) {
      nextPage(props.view);
    }
  }, [scroll.isScrollEnd]);

  if (props.value === null) {
    return;
  }

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

      {props.value && (
        <FeedView
          me={props.me}
          view={props.view}
          list={props.value}
          setSelectedPost={setSelectedPost}
          openModalPhoto={openModalPhoto}
          handleModifyStat={props.handleModifyStat}
          tag={props.tag}
        />
      )}
    </div>
  );
};
const FeedView = (props) => {
  return (
    <>
      {props.list.length == 0 && (
        <NothingFound me={props.me} view={props.view} tag={props.tag} />
      )}
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

const NothingFound = (props) => {
  const dataMe = {
    Posts: {
      header: "You don’t have any posts yet",
      content: "Post a any tweet. When you do, it’ll show up here.",
    },
    Replies: {
      header: "You don’t have any replies yet",
      content:
        "Reply on any post to show it some interest. When you do, it’ll show up here.",
    },
    Retweets: {
      header: "You don’t have any retweets yet",
      content:
        "Tap the retweet symbol on any post to show it some interest. When you do, it’ll show up here.",
    },
    Likes: {
      header: "You don’t have any likes yet",
      content:
        "Tap the heart on any post to show it some love. When you do, it’ll show up here.",
    },
  };

  const dataOther = {
    Posts: {
      header: "@" + props.tag + " hasn’t posted anything",
      content: "When they do, those posts will show up here.",
    },
    Replies: {
      header: "@" + props.tag + " hasn’t replied anything",
      content: "When they do, those replies will show up here.",
    },
    Retweets: {
      header: "@" + props.tag + " hasn’t retweeted any posts",
      content: "When they do, those posts will show up here.",
    },
    Likes: {
      header: "@" + props.tag + " hasn’t liked any posts",
      content: "When they do, those posts will show up here.",
    },
  };

  if (!props.view) {
    return;
  }
  return (
    <div className="flex flex-col pl-[20%] pr-[20%] pt-10 space-y-2">
      <p className="font-black text-3xl">
        {props.me ? dataMe[props.view].header : dataOther[props.view].header}
      </p>
      <span className="font-normal text-sm text-icon-default-color">
        {props.me ? dataMe[props.view].content : dataOther[props.view].content}
      </span>
    </div>
  );
};

export default Feed;

/*
Regarder si on peut aller vers une route inexistante qui ne sert qu'à ouvrir un modal
*/

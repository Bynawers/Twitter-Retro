import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import ReduceBigNumber from "../utils/ReduceBigNumbers";

import {
  likeTweet,
  unlikeTweet,
  retweetTweet,
  unretweetTweet,
  bookmarkTweet,
  unbookmarkTweet,
} from "../services/RequestTweets";
import IconButton from "./button/IconButton";

import { useAuth } from "../hooks/AuthProvider";
import { useProfile } from "../hooks/ProfileProvider";

const ActionButtons = (props) => {
  const auth = useAuth();
  const { updateUser } = useAuth();
  const navigate = useNavigate();
  const {
    addLikedTweet,
    addRetweetedTweet,
    addBookmarkedTweet,
    removeLikedTweet,
    removeRetweetedTweet,
    removeBookmarkedTweet,
  } = useProfile();

  const [like, setLike] = useState(
    auth.user.likes ? auth.user.likes.includes(props.id) : false
  );
  const [retweet, setRetweet] = useState(
    auth.user.retweets ? auth.user.retweets.includes(props.id) : false
  );
  const [bookmark, setBookmark] = useState(
    auth.user.bookmarks ? auth.user.bookmarks.includes(props.id) : false
  );

  const toParametersPost =
    "/" +
    (props.post
      ? props.post.author
        ? props.post.author.tag
        : "undefined"
      : "undefined") +
    "/status/" +
    props.id +
    "?q=comment";

  const handleComment = async (e) => {
    navigate(toParametersPost, { state: { data: props.data } });
  };

  const handleLike = async (e) => {
    e.preventDefault();

    let response;
    if (!like) {
      response = await likeTweet(props.id);
      response.status === 200
        ? addLikedTweet(props.post, response.data.tweetStat)
        : "";
    } else {
      response = await unlikeTweet(props.id);
      response.status === 200
        ? removeLikedTweet(props.id, response.data.tweetStat)
        : "";
    }

    if (response.status == 200) {
      setLike(!like);

      const updatedUser = {
        ...auth.user,
        likes: response.data.likes,
        stat: response.data.userStat,
      };

      updateUser(updatedUser);
    } else {
      toast.error("An error has occurred");
    }
  };

  const handleRetweet = async (e) => {
    e.preventDefault();

    let response;
    if (!retweet) {
      response = await retweetTweet(props.id);
      response.status === 200
        ? addRetweetedTweet(props.post, response.data.tweetStat)
        : "";
    } else {
      response = await unretweetTweet(props.id);
      response.status === 200
        ? removeRetweetedTweet(props.id, response.data.tweetStat)
        : "";
    }

    if (response.status == 200) {
      setRetweet(!retweet);

      const updatedUser = {
        ...auth.user,
        retweets: response.data.retweets,
        stat: response.data.userStat,
      };

      updateUser(updatedUser);
    } else {
      toast.error("An error has occurred");
    }
  };

  const handleBookmark = async (e) => {
    e.preventDefault();

    let response;
    if (!bookmark) {
      response = await bookmarkTweet(props.id);
      response.status === 200 ? addBookmarkedTweet(props.post) : "";
    } else {
      response = await unbookmarkTweet(props.id);
      response.status === 200 ? removeBookmarkedTweet(props.id) : "";
    }

    if (response.status == 200) {
      setBookmark(!bookmark);
      const updatedUser = {
        ...auth.user,
        bookmarks: response.data.bookmarks,
        stat: response.data.userStat,
      };

      updateUser(updatedUser);
    } else {
      toast.error("An error has occurred");
    }
  };

  const handleShare = (e) => {};

  return (
    <div
      className={`flex flex-row justify-between h-12 w-full " ${
        props.view == "main" ? "border-b-[1px] border-t-[1px]" : ""
      }`}
    >
      <IconButton
        event={handleComment}
        value={ReduceBigNumber(props.data ? props.data.comment : -1)}
        colorHover={"#54b3f3"}
        backgroundHover={"#e9f6fd"}
        styles="z-20"
        name="chat"
      />
      <IconButton
        event={handleRetweet}
        value={ReduceBigNumber(props.data ? props.data.retweet : -1)}
        colorHover={"#13ba82"}
        backgroundHover={"#def1eb"}
        state={retweet}
        styles="z-20"
        name="retweet"
      />
      <IconButton
        event={handleLike}
        value={ReduceBigNumber(props.data ? props.data.like : -1)}
        colorHover={"#fa2c8b"}
        backgroundHover={"#fee7f2"}
        state={like}
        styles="z-20"
        name="like"
      />

      {props.view == "menu" && (
        <IconButton
          event={handleComment}
          value={ReduceBigNumber(props.data ? props.data.view : -1)}
          colorHover={"#54b3f3"}
          backgroundHover={"#e9f6fd"}
          styles="z-20"
          name="view"
        />
      )}
      {props.view == "main" && (
        <IconButton
          event={handleBookmark}
          value={ReduceBigNumber(props.data ? props.data.bookmark : -1)}
          colorHover={"#54b3f3"}
          backgroundHover={"#e9f6fd"}
          styles="z-20"
          state={bookmark}
          name="bookmark"
        />
      )}

      {props.view == "menu" && (
        <div className="flex flex-row space-x-1">
          <IconButton
            event={handleBookmark}
            state={bookmark}
            name="bookmark"
            colorHover={"#54b3f3"}
            styles="z-20"
            backgroundHover={"#e9f6fd"}
          />
        </div>
      )}
    </div>
  );
};

const PostButton = (props) => {
  const reduceValue = ReduceBigNumber(props.value);

  const handleClickButton = (e) => {
    e.preventDefault();
    alert("test");
  };

  return (
    <button className="flex items-center" onClick={handleClickButton}>
      <div className="active:bg-iconBackgroundHover p-2 rounded-full">
        {props.icon}
      </div>
      {props.value !== null && (
        <span className="text-icon pl-2 text-sm">{reduceValue}</span>
      )}
    </button>
  );
};

export default ActionButtons;

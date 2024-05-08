import React, { useState, useEffect } from "react";

import { useLocation, Link } from "react-router-dom";

import HeaderBack from "../components/header/HeaderBack";

import ActionButtons from "../components/ActionsButtons";
import PostYourself from "../components/PostYourself";
import IconButton from "../components/button/IconButton";
import ModalPhoto from "../components/modal/ModalPhoto";
import Feed from "../components/Feed";

import { getTweetPerId, getComments } from "../services/RequestTweets";
import DateConverter from "../utils/DateConverter";
import { useAuth } from "../hooks/AuthProvider";

import twitterConfig from "../../twitterConfig.json";
import ClassicButton from "../components/button/ClassicButton";

const BASE_URL = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL + "/images/"
  : twitterConfig.BASE_URL_ONLINE + "/images/";

const Post = () => {
  const auth = useAuth();
  const [tweet, setTweet] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [modalPhoto, setModalPhoto] = useState(false);
  const location = useLocation();

  const parts = location.pathname.split("/");
  const id = parts[parts.length - 1];

  const queryParams = new URLSearchParams(location.search);
  const isComment = queryParams.get("q") == "comment";

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTweetPerId(id);
      if (!data) {
        setError(true);
      }
      setTweet(data);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const tweets = await getComments(tweet._id, 1);
      setComments(tweets.data);
    };
    fetchData();
  }, [tweet]);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleAddComment = (comment) => {
    if (!comment) {
      return;
    }
    setComments([comment, ...comments]);
  };

  if (error && !tweet) {
    return (
      <div className="flex flex-col space-y-5 w-full justify-center items-center h-[200px]">
        <span className="text-gray-600">
          Something went wrong. Try reloading.
        </span>
        <ClassicButton text="Retry" color="twitter" event={handleReload} />
      </div>
    );
  }

  if (!tweet) {
    return;
  }

  return (
    <div className="flex flex-col h-screen">
      <HeaderBack view="post" />
      <div className="pl-4 pr-4">
        <div className="h-3 w-full" />
        <div className="flex flex-row h-[42px]">
          <img
            className="flex h-[40px] w-[40px] rounded-full object-cover mr-2"
            src={BASE_URL + "profile/" + tweet.author._id}
          />
          <div className="w-full h-full flex flex-col">
            <span className="text-sm font-bold">{tweet.author.fullName}</span>
            <span className="text-sm font-light">{tweet.author.tag}</span>
          </div>
          <div className="h-full ml-2">
            {tweet.author.tag == auth.user.tag && (
              <IconButton
                name="more"
                tooltip="postMoreDetails"
                colorHover={"#54b3f3"}
                backgroundHover={"#e9f6fd"}
              />
            )}
          </div>
        </div>
        <main className="flex w-full flex-col">
          <div className="mt-3 flex w-full">
            <textarea
              readOnly
              value={tweet.body}
              className="w-full outline-none overflow-hidden resize-none text-blackLight"
            />
          </div>
          <div className="flex mt-3 w-full">
            <Link
              state={{ image: tweet.imageContent }}
              onClick={() => setModalPhoto(true)}
              className="z-20"
            >
              {!imageError && (
                <img
                  className="flex rounded-xl object-cover mt-3"
                  src={BASE_URL + "post/" + tweet._id}
                  onError={handleImageError}
                />
              )}
            </Link>
          </div>
          <div className="flex w-full h-5 mt-4 mb-4 space-x-1">
            <time className="text-sm text-textLight">{tweet.date}</time>
            <span className="text-sm text-textLight">
              {DateConverter(tweet.createdAt)}
              {" · "}
              <span className="text-black font-bold">
                {tweet.stat.view}
              </span>{" "}
              Vues
            </span>
          </div>
          <ActionButtons view="main" data={tweet.stat} id={tweet._id} />
        </main>
      </div>
      <PostYourself
        id={tweet._id}
        isComment={isComment}
        userId={auth.user._id}
        handleAddComment={handleAddComment}
      />
      <Feed value={comments} />
      <ModalPhoto
        modalIsOpen={modalPhoto}
        setIsOpen={setModalPhoto}
        id={tweet._id}
      />
    </div>
  );
};

export default Post;

import React, { useState } from "react";

import { useLocation, Link } from "react-router-dom";

import { IoEllipsisHorizontal } from "react-icons/io5";

import HeaderBack from "../components/header/HeaderBack";

import ActionButtons from "../components/ActionsButtons";
import Comment from "../components/Comment";
import PostYourself from "../components/PostYourself";

import twitterConfig from "../../twitterConfig.json";

const BASE_URL = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL + "/images/"
  : twitterConfig.BASE_URL_ONLINE + "/images/";

const Post = (props) => {
  const [bannerError, setBannerError] = useState(false);
  const location = useLocation();

  const data = location.state.data;

  const handleImageError = () => {
    setBannerError(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <HeaderBack view="post" />
      <div className="pl-4 pr-4">
        <div className="h-3 w-full" />
        <div className="flex flex-row h-[42px] bg-red">
          <img
            className="flex h-[40px] w-[40px] rounded-full object-cover mr-2"
            src={BASE_URL + "profile/" + data.author._id}
          />
          <div className="w-full h-full flex flex-col">
            <span className="text-sm font-bold">{data.author.fullName}</span>
            <span className="text-sm font-light">{data.author.tag}</span>
          </div>
          <div className="h-full ml-2">
            <button>
              <IoEllipsisHorizontal size={20} />
            </button>
          </div>
        </div>
        <main className="flex w-full flex-col">
          <div className="mt-3 flex w-full">
            <textarea
              readOnly
              value={data.body}
              className="w-full outline-none overflow-hidden resize-none text-blackLight"
            />
          </div>
          <div className="flex mt-3 w-full">
            <img
              className="flex rounded-xl object-cover mt-3"
              src={BASE_URL + "post/" + data._id}
              onError={handleImageError}
            />
          </div>
          <div className="flex w-full h-5 mt-4 mb-4 space-x-1">
            <time className="text-sm text-textLight">{data.date}</time>
            <span>·</span>
            <span className="text-sm text-textLight">
              <span className="text-black font-bold">61,6 k</span> vues
            </span>
          </div>
          <ActionButtons view="main" data={data.stat} id={data._id} />
          <PostYourself />
        </main>
      </div>
    </div>
  );
};

export default Post;

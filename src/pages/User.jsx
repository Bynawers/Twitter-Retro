import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useChat } from "../hooks/ChatP";

import { useAuth } from "../hooks/AuthProvider";

import IconButton from "../components/button/IconButton";
import ClassicButton from "../components/button/ClassicButton";

import HeaderBack from "../components/header/HeaderBack";
import TabNavigator from "../components/navigation/TabNavigator";
import ModalEdit from "../components/modal/ModalEdit";

import ReduceBigNumbers from "../utils/ReduceBigNumbers";
import twitterConfig from "../../twitterConfig.json";
import {
  getUserByTag,
  followUser,
  unfollowUser,
} from "../services/RequestUsers";

import DateUser from "../utils/DateUser";

import FeedUser from "../components/FeedUser";
import axios from "axios";

const BASE_URL_IMAGE = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL + "/images/"
  : twitterConfig.BASE_URL_ONLINE + "/images/";

const BASE_URL = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL
  : twitterConfig.BASE_URL_ONLINE;

function User() {
  const navigate = useNavigate();
  const setSelectedChat = useChat().setSelectedChat;
  const [init, setInit] = useState(false);
  const [view, setView] = useState("Posts");
  const [user, setUser] = useState([]);

  const [bannerError, setBannerError] = useState(false);

  const [isFollow, setIsFollow] = useState(null);

  const [modalEdit, setModalEdit] = useState(false);

  const [me, setMe] = useState(null);
  const location = useLocation();

  const parts = location.pathname.split("/");
  const username = parts[parts.length - 1];

  const auth = useAuth();

  const handleClickMessage = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Auth: auth.token,
      },
    };
    const { data } = await axios.post(
      BASE_URL + "/api/chat",
      {
        userId: user._id,
      },
      config
    );
    setSelectedChat(data);
    navigate("/messages");
  };

  useEffect(() => {
    const myTag = auth.user.tag;
    if (myTag == undefined) {
      return;
    }
    setMe(username === myTag);
  }, [auth]);

  useEffect(() => {
    setInit(true);
    const fetchData = async () => {
      if (user.length > 0) {
        return;
      }
      try {
        const data = await getUserByTag(username);
        setUser(data);
        if (auth.user.following) {
          let isFollowing = auth.user.following.includes(data._id);
          setIsFollow(isFollowing);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des tweets:", error);
      }
    };

    if (!me) {
      fetchData();
    }
  }, [username]);

  const handleFollow = async () => {
    let response;
    if (!isFollow) {
      response = await followUser(user._id);
    } else {
      response = await unfollowUser(user._id);
    }

    if (response) {
      toast.success("Operation success");

      setIsFollow(!isFollow);
    } else {
      toast.error("An error has occurred");
    }
  };

  if (!me && user.tag == null) {
    return <AccountNotExist name={username} />;
  }

  const handleOpenEdit = () => {
    setModalEdit(true);
  };

  const handleBannerError = () => {
    setBannerError(true);
  };

  return (
    <div className="flex flex-col">
      <HeaderBack
        view="user"
        name={me ? (auth.user ? auth.user.fullName : "") : user.fullName}
        post={
          me ? (auth.user ? auth.user.stat.postCount : []) : user.stat.postCount
        }
      />
      <ModalEdit
        modalIsOpen={modalEdit}
        setIsOpen={setModalEdit}
        user={auth.user}
      />
      <main className="flex flex-1 flex-col h-full w-full">
        <div className="w-full min-h-[200px] bg-banner">
          {!bannerError && (
            <img
              src={BASE_URL_IMAGE + "banner/" + (me ? auth.user._id : user._id)}
              className="w-full h-[200px] object-cover"
              onError={handleBannerError}
            />
          )}
        </div>
        <div className=" w-full px-4 pt-3 mb-4">
          <div className="flex justify-between w-full h-[70px]">
            <div className="relative h-[140px] bottom-[85px] w-[140px] rounded-full bg-foreground border-4 border-white z-0">
              <img
                src={
                  BASE_URL_IMAGE + "profile/" + (me ? auth.user._id : user._id)
                }
                className="rounded-full w-full object-cover"
              />
            </div>
            {init && (
              <div className="flex h-full w-[169px] space-x-2 items-start justify-end">
                {me && (
                  <ClassicButton
                    text="Edit Profile"
                    color="white"
                    event={handleOpenEdit}
                  />
                )}
                {!me && (
                  <>
                    <div className="flex space-x-2">
                      <div onClick={handleClickMessage}>
                        <IconButton name="message" styles="border-[1px]" />
                      </div>
                    </div>
                    <ClassicButton
                      text={isFollow ? "Following" : "Follow"}
                      color={isFollow ? "white" : "black"}
                      type="full"
                      event={handleFollow}
                    />
                  </>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col h mt-1 mb-3">
            <span className="font-bold text-xl">
              {me ? auth.user.fullName : user.fullName}
            </span>

            <span className="font-normal text-sm text-icon-default-color">
              @{me ? auth.user.tag : user.tag}
            </span>
            <span className="text-gray-700 text-sm mt-2 mb-4">
              A rejoint le{" "}
              {me ? DateUser(auth.user.createdAt) : DateUser(user.createdAt)}
            </span>
          </div>
          <div className="h-auto w-full mb-3 overflow-x-hidden break-words">
            {me ? auth.user.bio : user.bio}
          </div>

          <div className="flex h-[20px] w-full space-x-4 text-sm">
            <p className="hover:underline">
              <span className="font-bold">
                {ReduceBigNumbers(
                  me ? auth.user.stat.followingCount : user.stat.followingCount
                )}{" "}
              </span>
              <a
                className="font-normal text-icon-default-color"
                href={(me ? auth.user.tag : user.tag) + "/follow?src=following"}
              >
                Following
              </a>
            </p>
            <p className="hover:underline">
              <span className="font-bold">
                {ReduceBigNumbers(
                  me ? auth.user.stat.followersCount : user.stat.followersCount
                )}{" "}
              </span>
              <a
                className="font-normal text-icon-default-color"
                href={(me ? auth.user.tag : user.tag) + "/follow?src=followers"}
              >
                Followers
              </a>
            </p>
          </div>
        </div>
        <nav className="h-[54px] w-full border-b-[1px]">
          <TabNavigator
            view={view}
            setView={setView}
            data={["Posts", "Replies", "Retweets", "Likes"]}
          />
        </nav>
        {me && <FeedUser me={me} view={view} user={user} />}
        {user.tag !== undefined && !me && (
          <FeedUser me={me} view={view} user={user} />
        )}
      </main>
    </div>
  );
}

const AccountNotExist = (props) => {
  return (
    <div className="flex flex-col h-screen">
      <HeaderBack view="user" name="Profile" />
      <main className="flex flex-col h-full w-full overflow-y-auto">
        <div className="w-full h-[200px] bg-banner" />
        <div className="w-full px-4 pt-3 mb-4">
          <div className="flex justify-between w-full h-[70px]">
            <div className="relative h-[140px] bottom-[85px] w-[140px] rounded-full bg-foreground border-4 border-white" />
          </div>
          <div className="flex flex-col h-[50px] mt-1 mb-3">
            <span className="font-bold text-xl">@{props.name}</span>
          </div>
        </div>
        <div className="flex flex-col h-[200px] w-full justify-center items-center">
          <div className="flex flex-col w-[320px]">
            <span className="text-3xl font-black">
              This account doesn’t exist
            </span>
            <span className="font-normal text-icon-default-color">
              Try searching for another.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default User;

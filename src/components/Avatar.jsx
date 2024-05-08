import { useState } from "react";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import TooltipUser from "./tooltip/TooltipUser";
import { toast } from "react-toastify";

import twitterConfig from "../../twitterConfig.json";

import { Link } from "react-router-dom";
import ClassicButton from "./button/ClassicButton";

import { followUser, unfollowUser } from "../services/RequestUsers";

import { useAuth } from "../hooks/AuthProvider";

const BASE_URL = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL
  : twitterConfig.BASE_URL_ONLINE;

const Avatar = (props) => {
  const auth = useAuth();

  const [isFollow, setIsFollow] = useState(props.follow);

  const handleFollow = async (e) => {
    e.preventDefault();
    let response;
    if (!isFollow) {
      response = await followUser(props.id);
    } else {
      response = await unfollowUser(props.id);
    }

    if (response) {
      toast.success("Operation success");

      setIsFollow(!isFollow);
    } else {
      toast.error("An error has occurred");
    }
  };

  if (props.search) {
    return (
      <Link
        className="flex flex-col w-full"
        to={"/" + props.tag}
        onClick={props.event}
      >
        <TooltipUser tag={props.tag} />
        <div
          className="flex
        cursor-pointer items-center xl:px-4 xl:py-3 font-sans w-[85px] xl:w-full hover:bg-gray-100 xl:justify-between justify-center"
        >
          <div className="flex flex-row items-center w-full">
            <img
              className="flex h-[40px] w-[40px] rounded-full object-cover"
              src={BASE_URL + "/images/profile/" + props.id}
            />
            <div className="hidden flex-col items-start xl:flex 2xl:flex w-full">
              <div className="flex w-full justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-md pl-3 font-bold">
                    {props.username}
                  </span>
                  <span className="text-md pl-3 font-light">@{props.tag}</span>
                </div>
                {auth.user.tag !== props.tag && (
                  <ClassicButton
                    text={isFollow ? "Following" : "Follow"}
                    color={isFollow ? "white" : "black"}
                    type="full"
                    event={handleFollow}
                  />
                )}
              </div>
              <span className="text-md pl-3 font-normal text-gray-700">
                {props.bio}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (props.group) {
    return (
      <button
        className="flex flex-col items-center absolute w-full"
        to={"/" + props.tag}
        onClick={props.event}
      >
        <TooltipUser tag={props.tag} />
        <div
          className="flex
        cursor-pointer items-center xl:px-4 xl:py-3 font-sans w-[85px] xl:w-full hover:bg-gray-100 xl:justify-between justify-center"
        >
          <div className="flex flex-row items-center">
            <img
              className="flex h-[40px] w-[40px] rounded-full object-cover"
              src={BASE_URL + "/images/profile/" + props.id}
            />
            <div className="hidden flex-col items-start xl:flex 2xl:flex">
              <span className="text-md pl-3 font-bold">{props.username}</span>
              <span className="text-md pl-3 font-light">@{props.tag}</span>
            </div>
          </div>
        </div>
      </button>
    );
  }

  if (props.static) {
    return (
      <Link
        className="flex flex-col items-center absolute w-full"
        to={"/" + props.tag}
        onClick={props.event}
      >
        <TooltipUser tag={props.tag} />
        <div
          className="flex
        cursor-pointer items-center xl:px-4 xl:py-3 font-sans w-[85px] xl:w-full hover:bg-gray-100 xl:justify-between justify-center"
        >
          <div className="flex flex-row items-center">
            <img
              className="flex h-[40px] w-[40px] rounded-full object-cover"
              src={BASE_URL + "/images/profile/" + props.id}
            />
            <div className="hidden flex-col items-start xl:flex 2xl:flex">
              <span className="text-md pl-3 font-bold">{props.username}</span>
              <span className="text-md pl-3 font-light">@{props.tag}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <button
      className="flex flex-col items-center absolute bottom-5 w-full"
      data-tooltip-id="signup"
    >
      <TooltipUser tag={props.tag} />
      <div
        className="flex
        cursor-pointer items-center rounded-full xl:px-4 xl:py-3 font-sans w-[85px] xl:w-full hover:bg-gray-200 xl:justify-between justify-center"
      >
        <div className="flex flex-row items-center">
          <img
            className="flex h-[50px] w-[50px] rounded-full object-cover"
            src={BASE_URL + "/images/profile/" + props.id}
          />
          <div className="hidden flex-col items-start xl:flex 2xl:flex">
            <span className="text-sm pl-3 font-bold">{props.username}</span>
            <span className="text-sm pl-3 font-light">@{props.tag}</span>
          </div>
        </div>
        <div className="hidden items-start xl:inline 2xl:inline">
          <HiOutlineDotsHorizontal size="1.5em" />
        </div>
      </div>
    </button>
  );
};

export default Avatar;

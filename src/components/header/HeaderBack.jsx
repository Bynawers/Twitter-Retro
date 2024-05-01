import React from "react";

import { useNavigate } from "react-router-dom";

import useScrollDirection from "../../utils/ScrollDirection";

import IconButton from "../button/IconButton";
import TabNavigator from "../navigation/TabNavigator";

const HeaderBack = (props) => {
  const scrollDirection = useScrollDirection();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      className={`z-10 m-x-4 border-b-[1px] sticky w-full bg-opacity-70 bg-white backdrop-filter backdrop-blur-md transition-all duration-500 sm:top-0 ${
        scrollDirection === "down" ? "-top-24" : "top-0"
      }`}
    >
      <div className="flex flex-row p-5 pl-0 flex-1 h-14 items-center">
        <div className="pl-3 w-[56px]">
          <IconButton name="back" event={handleGoBack} />
        </div>
        {props.view == "post" && (
          <span className="text-xl font-base">Poster</span>
        )}
        {props.view == "user" && (
          <div className="flex flex-col">
            <span className="font-bold text-xl">{props.name}</span>
            <span className="font-normal text-sm text-icon-default-color">
              {props.post} {props.post == 0 ? "post" : "posts"}
            </span>
          </div>
        )}
        {props.view == "follow" && (
          <div className="pl-5 flex flex-col">
            <span className="font-bold text-xl">Follow</span>
            <span className="font-normal text-sm text-icon-default-color">
              @{props.tag}
            </span>
          </div>
        )}
      </div>
      {props.view == "follow" && (
        <div className="flex flex-col h-[53px] w-full">
          <TabNavigator
            view={props.data}
            setView={props.setView}
            data={["following", "followers"]}
          />
        </div>
      )}
    </div>
  );
};

export default HeaderBack;

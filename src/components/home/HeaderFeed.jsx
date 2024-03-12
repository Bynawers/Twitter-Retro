import React, { useState, useEffect } from "react";

import { FiSettings } from "react-icons/fi";
import { FaTwitter } from "react-icons/fa";

import useScrollDirection from "../../utils/ScrollDirection";

const HeaderFeed = (props) => {
  const scrollDirection = useScrollDirection();

  return (
    <div
      className={`border-b-[1px] sticky w-full bg-opacity-70 bg-white backdrop-filter backdrop-blur-md transition-all duration-500 sm:top-0 ${
        scrollDirection === "down" ? "-top-24" : "top-0"
      }`}
    >
      <UpperHeader />
      <LowerHeader view={props.view} setView={props.setView} />
    </div>
  );
};

const UpperHeader = () => {
  return (
    <div className="flex flex-row flex-1 w-full h-14 sm:hidden justify-between pl-3 pr-1">
      <ProfileButton />
      <TwitterButton />
      <SettingButton />
    </div>
  );
};

const LowerHeader = (props) => {
  return (
    <div className="flex flex-row flex-1 w-full h-14">
      <button
        onClick={() => props.setView("Pour vous")}
        className="flex flex-[3] justify-center hover:bg-gray-200 transition-all duration-300 cursor-pointer"
      >
        <div className="flex h-full items-center flex-col justify-between">
          <div />
          <span
            className={
              "font-sans font-bold " +
              (props.view === "Pour vous" ? "" : "opacity-70 font-medium")
            }
          >
            Pour vous
          </span>
          <Indicator isVisible={props.view === "Pour vous"} />
        </div>
      </button>
      <button
        onClick={() => props.setView("Abonnement")}
        className="flex flex-[4] justify-center hover:bg-gray-200 transition-all duration-300 cursor-pointer"
      >
        <div className="flex h-full items-center flex-col justify-between">
          <div />
          <span
            className={
              "font-sans font-bold " +
              (props.view === "Abonnement" ? "" : "opacity-70 font-medium")
            }
          >
            Abonnement
          </span>
          <Indicator isVisible={props.view === "Abonnement"} />
        </div>
      </button>

      <div className="hidden sm:inline">
        <SettingButton />
      </div>
    </div>
  );
};

const Indicator = (props) => {
  return (
    <div
      className={
        " b-0 h-1.5 flex-end w-full rounded-xl " +
        (props.isVisible ? "bg-twitter" : "")
      }
    />
  );
};

const SettingButton = () => {
  return (
    <div className="flex h-full items-center pl-3 pr-3 justify-center">
      <button
        className="rounded-3xl p-2 hover:bg-gray-200 transition-all duration-300 cursor-pointer"
        onClick={() => /*open modal*/ {}}
      >
        <FiSettings size={17} />
      </button>
    </div>
  );
};

const TwitterButton = () => {
  return (
    <button className="self-center rounded-full p-2 hover:bg-gray-300">
      <FaTwitter size="2em" color="#00ADED" />
    </button>
  );
};

const ProfileButton = () => {
  return (
    <button className="self-center rounded-full p-2 hover:bg-gray-300">
      <img
        className="flex h-8 w-8 rounded-full object-cover"
        src="./src/assets/defaultAvatar.jpg"
      />
    </button>
  );
};

export default HeaderFeed;

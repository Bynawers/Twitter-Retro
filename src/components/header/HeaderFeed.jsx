import React from "react";

import useScrollDirection from "../../utils/ScrollDirection";

import IconButton from "../button/IconButton";

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
      <IconButton name="user" />
      <IconButton name="twitter" />
      <IconButton name="setting" />
    </div>
  );
};

const LowerHeader = (props) => {
  return (
    <div className="flex flex-row flex-1 w-full h-14">
      <ButtonHeaderNavigation
        setView={props.setView}
        view={props.view}
        text="Pour vous"
        styles="flex-[3]"
      />
      <ButtonHeaderNavigation
        setView={props.setView}
        view={props.view}
        text="Abonnement"
        styles="flex-[4]"
      />
    </div>
  );
};

const ButtonHeaderNavigation = (props) => {
  return (
    <button
      onClick={() => props.setView(props.text)}
      className={
        `flex justify-center hover:bg-gray-200 transition-all duration-300 cursor-pointer ` +
        props.styles
      }
    >
      <div className="flex h-full items-center flex-col justify-between">
        <div />
        <span
          className={
            "font-sans font-bold " +
            (props.view === props.text ? "" : "opacity-70 font-medium")
          }
        >
          {props.text}
        </span>
        <Indicator isVisible={props.view === props.text} />
      </div>
    </button>
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

export default HeaderFeed;

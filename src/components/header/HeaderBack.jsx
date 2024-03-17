import React, { useState, useEffect } from "react";

import { FiSettings } from "react-icons/fi";
import { FaTwitter, FaArrowLeft } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import useScrollDirection from "../../utils/ScrollDirection";

import IconButton from "../button/IconButton";

const HeaderBack = (props) => {
  const scrollDirection = useScrollDirection();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      className={`m-x-4 border-b-[1px] sticky w-full bg-opacity-70 bg-white backdrop-filter backdrop-blur-md transition-all duration-500 sm:top-0 ${
        scrollDirection === "down" ? "-top-24" : "top-0"
      }`}
    >
      <div className="flex flex-row p-5 pl-0 flex-1 h-14 items-center">
        <div className="w-[56px]">
          <IconButton name="back" event={handleGoBack} />
        </div>
        <span className="text-xl font-bold">Poster</span>
      </div>
    </div>
  );
};

export default HeaderBack;

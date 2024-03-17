import React, { useState, useEffect } from "react";

import useScrollDirection from "../../utils/ScrollDirection";

import SearchBar from "../../components/SearchBar";

const HeaderSearch = (props) => {
  const scrollDirection = useScrollDirection();

  return (
    <div
      className={`m-x-4 sticky w-full bg-white backdrop-filter transition-all duration-500 sm:top-0 ${
        scrollDirection === "down" ? "-top-24" : "top-0"
      }`}
    >
      <div className="flex flex-row p-5 pl-1 pr-1 flex-1 h-14 items-center">
        <SearchBar />
      </div>
    </div>
  );
};

export default HeaderSearch;

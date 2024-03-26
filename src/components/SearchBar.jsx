import { useState } from "react";

import { HiSearch, HiOutlineSearch } from "react-icons/hi";

import { FaRegTimesCircle } from "react-icons/fa";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDeleteSearch = () => {
    setSearch("");
  };

  return (
    <>
      <HiSearch className="absolute left-4 top-4 text-icon" size={25} />
      <input
        data-tooltip-id="search"
        type="text"
        placeholder="Chercher"
        value={search}
        onChange={handleChange}
        className=" w-full h-[40px] py-2 px-3 pl-[50px] pr-[50px] bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:bg-white focus:ring-blue-400"
      />
      {search !== "" && (
        <button onClick={handleDeleteSearch}>
          <FaRegTimesCircle
            className="absolute right-4 top-4 text-twitter"
            size={25}
          />
        </button>
      )}
    </>
  );
};

export default SearchBar;

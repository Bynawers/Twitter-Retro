import { useRef, useState, useEffect } from "react";

import { HiSearch } from "react-icons/hi";
import { FaRegTimesCircle } from "react-icons/fa";
import TooltipSearch from "./tooltip/TooltipSearch";
import { useNavigate } from "react-router-dom";

import { useProfile } from "../hooks/ProfileProvider";

import { getSearchUser } from "../services/RequestUsers";

const SearchBar = (props) => {
  const navigateTo = useNavigate();
  const inputRef = useRef(null);
  const tooltipRef = useRef(null);

  const [dataUser, setDataUser] = useState([]);

  const { addLatestSearch } = useProfile();

  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    if (props.search === "") {
      return;
    }
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        setDataUser([]);
        fetchData();
      }, 1000)
    );
  }, [props.search]);

  const fetchData = async () => {
    setDataUser(await getSearchUser(props.search));
  };

  const handleChange = (e) => {
    props.setSearch(e.target.value);
  };

  const handleDeleteSearch = () => {
    props.setSearch("");
  };

  const handleKeyPress = (e) => {
    if (props.search.length == 0) {
      return;
    }
    if (e.key === "Enter") {
      addLatestSearch(props.search);
      inputRef.current.blur();
      tooltipRef.current?.close();
      if (props.source) {
        props.requestData(props.search);
      }
      navigateTo('/explore?src="typed_query&q=' + props.search);
    }
  };

  return (
    <>
      <TooltipSearch
        search={props.search}
        dataUser={dataUser}
        dataTop={[]}
        tooltipRef={tooltipRef}
      />
      <HiSearch className="absolute left-4 top-4 text-icon" size={25} />
      <input
        ref={inputRef}
        data-tooltip-id="search"
        type="text"
        placeholder="Chercher"
        value={props.search}
        onChange={handleChange}
        className=" w-full h-[40px] py-2 px-3 pl-[50px] pr-[50px] bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:bg-white focus:ring-blue-400"
        onKeyUp={handleKeyPress}
      />
      {props.search !== "" && (
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

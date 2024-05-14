import React, { useEffect, useState } from "react";
import IconButton from "./button/IconButton";
import { Link, useNavigate } from "react-router-dom";

import ReduceBigNumber from "../utils/ReduceBigNumbers";
import { getTopHashtag } from "../services/RequestTweets";

const Trends = (props) => {
  const [trends, setTrends] = useState([]);
  const [page, setPage] = useState(1);
  const [noMore, setNoMore] = useState(false);
  const [maxPage, setMaxPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTopHashtag(page, props.full ? 30 : 10);
      setTrends(data.hashtags);
    };
    fetchData();
  }, []);

  return (
    <div
      className={`flex flex-col mb-4 bg-grey-100 font-semibold rounded-xl w-full ${
        props.white ? "bg-white" : "bg-foreground"
      }`}
    >
      <div className="px-3 py-4 flex flex-col">
        <span className="font-extrabold text-xl text-black">
          Tendances : France
        </span>
      </div>
      {trends.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <TrendsElement item={item} rank={index + 1} navigate={navigate} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

const TrendsElement = (props) => {
  const reduceValue = ReduceBigNumber(props.item.count);

  const handleDetail = () => {
    props.navigate(`/explore?src=typed_query&q=${props.item.text}`);
  };

  return (
    <div
      className="px-3 py-4 flex flex-col hover:bg-foregroundHover cursor-pointer"
      onClick={handleDetail}
    >
      <div className="h-5 flex justify-between">
        <span className="font-normal text-textLight text-sm">
          {props.rank} · Tendances
        </span>
      </div>
      <div className="h-5">
        <span>#{props.item.text}</span>
      </div>
      <div className="h-5">
        <span className="font-normal text-textLight text-sm">
          {reduceValue} Posts
        </span>
      </div>
    </div>
  );
};

export default Trends;

import React, { useEffect, useState } from "react";
import IconButton from "./button/IconButton";

import ReduceBigNumber from "../utils/ReduceBigNumbers";
import { getTopHashtag } from "../services/RequestTweets";

const Trends = (props) => {
  const [trends, setTrends] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTopHashtag();
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
            <TrendsElement item={item} rank={index + 1} />
          </React.Fragment>
        );
      })}
      <div className="px-2 py-3 rounded-b-xl font-normal text-twitter hover:bg-foregroundHover cursor-pointer">
        <span>Voir plus</span>
      </div>
    </div>
  );
};

const TrendsElement = (props) => {
  const reduceValue = ReduceBigNumber(props.item.count);
  const handleTooltip = () => {};

  return (
    <div className="px-3 py-4 flex flex-col hover:bg-foregroundHover cursor-pointer ">
      <div className="h-5 flex justify-between">
        <span className="font-normal text-textLight text-sm">
          {props.rank} · Tendances
        </span>
        <IconButton
          name="more"
          styles="hover:bg-iconBackgroundHover"
          colorHover={"#229df0"}
          backgroundHover={"#dae8f0"}
          event={handleTooltip}
          value={null}
        />
      </div>
      <div className="h-5">
        <span>#{props.item._id}</span>
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

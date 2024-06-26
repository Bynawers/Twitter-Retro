import React, { useState, useEffect } from "react";

import { getFeedTrendy } from "../../services/RequestTweets.jsx";
import Feed from "../Feed.jsx";

function FeedTab() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFeedTrendy();
      setData(data.tweets);
    };
    if (data.length > 0) {
      return;
    }
    fetchData();
  }, []);

  const handleModifyStat = (id, stat) => {
    const newData = data.map((tweet) => {
      if (tweet._id === id) {
        return {
          ...tweet,
          stat: stat,
        };
      } else {
        return tweet;
      }
    });

    setData(newData);
  };

  if (data.length == 0) {
    return (
      <div className="flex flex-col pl-[20%] pr-[20%] pt-10 space-y-2">
        <p className="font-black text-3xl">Oups !</p>
        <span className="font-normal text-sm text-icon-default-color">
          Une erreur s'est produite...
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Feed value={data} handleModifyStat={handleModifyStat} />
    </div>
  );
}

export default FeedTab;

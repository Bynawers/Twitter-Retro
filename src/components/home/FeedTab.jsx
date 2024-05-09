import React, { useState, useEffect } from "react";

import Post from "../Post.jsx";

import data from "../../services/FeedExample.json";

import TooltipMoreDetails from "../tooltip/TooltipMoreDetails.jsx";
import { getFeedTrendy } from "../../services/RequestTweets.jsx";

function Feed() {
  const [selectedPost, setSelectedPost] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      getFeedTrendy();
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <TooltipMoreDetails data={selectedPost} />
    </div>
  );
}

export default Feed;

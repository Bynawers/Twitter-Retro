import React, { useState } from "react";

import Post from "../Post.jsx";

import data from "../../services/FeedExample.json";

import TooltipMoreDetails from "../tooltip/TooltipMoreDetails.jsx";

function Feed() {
  const [selectedPost, setSelectedPost] = useState([]);

  return (
    <div className="flex flex-col">
      <TooltipMoreDetails data={selectedPost} />
      {data.map((elem, index) => {
        return (
          <React.Fragment key={index}>
            <Post data={elem} setSelectedPost={setSelectedPost} />
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Feed;

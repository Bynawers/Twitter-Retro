import React, { useState } from "react";

import Post from "../Post.jsx";

import data from "../../services/FeedExample.json";

function Feed() {
  return (
    <div className="flex flex-col">
      {data.map((elem, index) => {
        console.log(elem.user);
        return (
          <React.Fragment key={index}>
            <Post data={elem} />
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Feed;

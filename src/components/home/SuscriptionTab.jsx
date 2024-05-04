import React, { useState } from "react";

import Feed from "../Feed.jsx";

function Suscription() {
  const [feed, setFeed] = useState([]);
  return (
    <div className="flex flex-col">
      <Feed value={feed} />
    </div>
  );
}

// <Post data={elem} setSelectedPost={setSelectedPost} />

export default Suscription;

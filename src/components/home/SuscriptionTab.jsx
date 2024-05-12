import React, { useState, useEffect } from "react";

import Feed from "../Feed.jsx";

import { useAuth } from "../../hooks/AuthProvider.jsx";
import { getFeed } from "../../services/RequestTweets.jsx";

function Suscription() {
  const auth = useAuth();

  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFeed();
      setFeed(data.tweets);
    };
    fetchData();
  }, []);

  if (auth.user.following.length == 0) {
    return (
      <div className="flex flex-col pl-[20%] pr-[20%] pt-10 space-y-2">
        <p className="font-black text-3xl">Vous n'avez pas d'abonnement</p>
        <span className="font-normal text-sm text-icon-default-color">
          Cherchez des utilisateurs et abonnez vous à leur compte pour accéder à
          tous leur derniers tweets
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <Feed value={feed} />
    </div>
  );
}

export default Suscription;

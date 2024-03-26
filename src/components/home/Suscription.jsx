import React, { useState, useEffect } from "react";

import Post from "../Post.jsx";
import { getTweets } from "../../services/RequestTweets.jsx";
import TooltipMoreDetails from "../tooltip/TooltipMoreDetails.jsx";

import { useAuth } from "../../hooks/AuthProvider";

function Subscription() {
  const [selectedPost, setSelectedPost] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = auth.token;
        const userId = 1;
        const tweets = await getTweets(userId, token); // Attendre la résolution de la promesse
        setData(tweets);
        setLoading(false); // Mettre à jour l'état de chargement une fois que les données sont chargées
      } catch (error) {
        console.error("Erreur lors de la récupération des tweets:", error);
        // Gérer l'erreur si nécessaire
      }
    };

    fetchData();
  }, [auth]);

  return (
    <div className="flex flex-col">
      <TooltipMoreDetails data={selectedPost} />
      {data.map((elem, index) => {
        console.log(elem.user);
        return (
          <React.Fragment key={index}>
            <Post data={elem} setSelectedPost={setSelectedPost} />
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Subscription;

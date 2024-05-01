import { useState, useEffect } from "react";

import Feed from "./Feed";
import { useProfile } from "../hooks/ProfileProvider";
import {
  getUserLikes,
  getUserPosts,
  getUserRetweets,
} from "../services/RequestUsers";

const FeedUser = (props) => {
  const { likes, retweets, posts } = useProfile();
  const [userLikes, setUserLikes] = useState([]);
  const [userRetweets, setUserRetweets] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userPosts = await getUserPosts(props.user.tag);
      const userRetweets = await getUserRetweets(props.user.tag);
      const userLikes = await getUserLikes(props.user.tag);
      setUserPosts(userPosts.data);
      setUserRetweets(userRetweets.data);
      setUserLikes(userLikes.data);
    };
    if (!props.me) {
      fetchData();
    }
  }, []);

  return (
    <>
      {props.view == "Posts" && (
        <Feed
          value={props.me ? posts : userPosts}
          view="Posts"
          me={props.me}
          tag={props.user.tag}
        />
      )}
      {props.view == "Retweets" && (
        <Feed
          value={props.me ? retweets : userRetweets}
          view="Retweets"
          me={props.me}
          tag={props.user.tag}
        />
      )}
      {props.view == "Likes" && (
        <Feed
          value={props.me ? likes : userLikes}
          view="Likes"
          me={props.me}
          user={props.user}
          tag={props.user.tag}
        />
      )}
    </>
  );
};

export default FeedUser;

import { useState, useEffect } from "react";

import Feed from "./Feed";
import { useProfile } from "../hooks/ProfileProvider";
import {
  getUserLikes,
  getUserPosts,
  getUserRetweets,
} from "../services/RequestUsers";

const FeedUser = (props) => {
  const { likes, retweets, posts, replies } = useProfile();
  const [userLikes, setUserLikes] = useState(null);
  const [userRetweets, setUserRetweets] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [userReplies, setUserReplies] = useState(null);

  useEffect(() => {
    const fetchData = async (user) => {
      const userPosts = await getUserPosts(user, 1, "tweet");
      const userReplies = await getUserLikes(user, 1, "reply");
      const userRetweets = await getUserRetweets(user, 1);
      const userLikes = await getUserLikes(user, 1);
      setUserPosts(userPosts.data);
      setUserReplies(userReplies.data);
      setUserRetweets(userRetweets.data);
      setUserLikes(userLikes.data);
    };

    if (!props.me) {
      fetchData(props.user.tag);
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
      {props.view == "Replies" && (
        <Feed
          value={props.me ? replies : userReplies}
          view="Replies"
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

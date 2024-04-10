import { useState, useEffect } from "react";
import Feed from "./Feed";
import { useAuth } from "../hooks/AuthProvider";

const FeedUser = (props) => {
  const auth = useAuth();

  const [post, setPost] = useState([]);
  const [retweet, setRetweet] = useState([]);
  const [like, setLike] = useState([]);

  const [postIds, setPostIds] = useState([]);
  const [retweetIds, setRetweetIds] = useState([]);
  const [likeIds, setLikeIds] = useState([]);

  useEffect(() => {
    if (!props.me) {
      if (!props.user) {
        return;
      }
      setPostIds(props.user.tweets);
      setRetweetIds(props.user.retweets);
      setLikeIds(props.user.likes);
    } else {
      setPostIds(auth.user.tweets);
      setRetweetIds(auth.user.retweets);
      setLikeIds(auth.user.likes);
    }
  }, [props.me]);

  return (
    <>
      {props.view == "Posts" && (
        <Feed ids={postIds} value={post} setValue={setPost} />
      )}
      {props.view == "Retweets" && (
        <Feed ids={retweetIds} value={retweet} setValue={setRetweet} />
      )}
      {props.view == "Likes" && (
        <Feed ids={likeIds} value={like} setValue={setLike} />
      )}
    </>
  );
};

export default FeedUser;

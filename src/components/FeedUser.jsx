import Feed from "./Feed";
import { useProfile } from "../hooks/ProfileProvider";

const FeedUser = (props) => {
  const { likes, retweets, posts } = useProfile();

  return (
    <>
      {props.view == "Posts" && <Feed value={posts} />}
      {props.view == "Retweets" && <Feed value={retweets} />}
      {props.view == "Likes" && <Feed value={likes} />}
    </>
  );
};

export default FeedUser;

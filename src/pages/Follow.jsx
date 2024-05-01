import { useState, useEffect } from "react";

import { useLocation, useParams } from "react-router-dom";
import HeaderBack from "../components/header/HeaderBack";

import InfinitList from "./InfinitList";

import { getFollowing, getFollowers } from "../services/RequestUsers";

function Follow() {
  const location = useLocation();
  const { user } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("src");

  const [view, setView] = useState(
    source == "followers"
      ? source
      : source == "following"
      ? source
      : "followers"
  );

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const followingsUsers = await getFollowing(user);
      const followersUsers = await getFollowers(user);
      setFollowing(followingsUsers.data);
      setFollowers(followersUsers.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen">
      <HeaderBack
        view="follow"
        data={view}
        setView={setView}
        source={source}
        tag={user}
      />
      <main className="flex">
        {view === "followers" &&
          (followers.length === 0 ? (
            <NoFollow view={view} />
          ) : (
            <InfinitList data={followers} />
          ))}
        {view === "following" &&
          (following.length === 0 ? (
            <NoFollow view={view} />
          ) : (
            <InfinitList data={following} />
          ))}
      </main>
    </div>
  );
}

const NoFollow = (props) => {
  const data = {
    followers: {
      header: "Looking for followers?",
      content:
        "When someone follows this account, they’ll show up here. Posting and interacting with others helps boost followers.",
    },
    following: {
      header: "Be in the know",
      content:
        "Following accounts is an easy way to curate your timeline and know what’s happening with the topics and people you’re interested in.",
    },
  };
  return (
    <div className="flex flex-col pl-[20%] pr-[20%] pt-10 space-y-2">
      <p className="font-black text-3xl">{data[props.view].header}</p>
      <span className="font-normal text-sm text-icon-default-color">
        {data[props.view].content}
      </span>
    </div>
  );
};

export default Follow;

import React from "react";
import { useState, useEffect } from "react";
import HeaderSearch from "../components/header/HeaderSearch";
import Trends from "../components/Trends";

import { useLocation } from "react-router-dom";

import { searchLatestTweet, searchHashtags } from "../services/RequestTweets";
import { getSearchUser } from "../services/RequestUsers";
import Avatar from "../components/Avatar";
import Feed from "../components/Feed";
import { useAuth } from "../hooks/AuthProvider";

function Explorer() {
  const auth = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");
  const source = queryParams.get("src");

  const [view, setView] = useState("Hashtag");
  const [search, setSearch] = useState("");

  const [dataUser, setDataUser] = useState([]);
  const [dataHashtag, setDataHashtag] = useState([]);
  const [dataLatest, setDataLatest] = useState([]);

  useEffect(() => {
    if (!source) {
      return;
    }
    if (query === "") {
      return;
    }
    requestData(query);
  }, [source]);

  const requestData = async (value) => {
    setDataUser(await getSearchUser(value));
    setDataLatest(await searchLatestTweet(value));
    const searchHashtagsData = await searchHashtags(value);
    setDataHashtag(searchHashtagsData.posts);
  };

  const handleModifyStatHashtag = (id, stat) => {
    const newData = dataHashtag.map((tweet) => {
      if (tweet._id === id) {
        return {
          ...tweet,
          stat: stat,
        };
      } else {
        return tweet;
      }
    });

    setDataHashtag(newData);
  };

  const handleModifyStatLatest = (id, stat) => {
    const newData = dataLatest.map((tweet) => {
      if (tweet._id === id) {
        return {
          ...tweet,
          stat: stat,
        };
      } else {
        return tweet;
      }
    });

    setDataLatest(newData);
  };

  return (
    <div className="flex flex-col">
      <HeaderSearch
        tab={true}
        view={view}
        setView={setView}
        search={search}
        setSearch={setSearch}
        dataUser={dataUser}
        dataTop={dataHashtag}
        source={source}
        requestData={requestData}
      />
      <main className="flex flex-1 flex-col h-full w-full">
        {source && (
          <>
            {view === "Hashtag" && (
              <HashtagView
                search={query}
                data={dataHashtag}
                handleModifyStat={handleModifyStatHashtag}
              />
            )}
            {view === "Latest" && (
              <LatestView
                search={query}
                data={dataLatest}
                handleModifyStat={handleModifyStatLatest}
              />
            )}
            {view === "People" && (
              <PeopleView auth={auth} search={query} data={dataUser} />
            )}
          </>
        )}
        {!source && <TrendsView />}
      </main>
    </div>
  );
}

const TrendsView = () => {
  return (
    <div>
      <div className="py-10 px-10">
        <span className="text-lg text-gray-500">
          Recherchez les utilisateurs et les tweets que vous souhaitez...
        </span>
      </div>
      <Trends white={true} full={true} />
    </div>
  );
};

const HashtagView = (props) => {
  if (!props.data) {
    return <span>Error</span>;
  }
  return (
    <div>
      <Feed value={props.data} handleModifyStat={props.handleModifyStat} />
      {props.data.length == 0 && <SearchNotExist search={props.search} />}
    </div>
  );
};

const PeopleView = (props) => {
  return (
    <div>
      {props.data.map((item, index) => {
        let isFollow = props.auth.user.following.includes(item._id);
        return (
          <React.Fragment key={index}>
            <div className="h-auto w-full hover:bg-gray-100">
              <Avatar
                follow={isFollow}
                search={true}
                id={item._id}
                tag={item.tag}
                username={item.fullName}
                bio={item.bio}
              />
            </div>
          </React.Fragment>
        );
      })}
      {props.data.length == 0 && <SearchNotExist search={props.search} />}
    </div>
  );
};

const LatestView = (props) => {
  return (
    <div>
      <Feed value={props.data} handleModifyStat={props.handleModifyStat} />
      {props.data.length == 0 && <SearchNotExist search={props.search} />}
    </div>
  );
};

const SearchNotExist = (props) => {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-col h-full w-full overflow-y-auto">
        <div className="flex flex-col h-[200px] w-full justify-center items-center">
          <div className="flex flex-col w-[320px]">
            <span className="text-3xl font-black">
              No result for "{props.search}"
            </span>
            <span className="font-normal text-icon-default-color">
              Try searching for something else
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Explorer;

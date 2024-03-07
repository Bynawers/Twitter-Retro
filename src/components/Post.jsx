import {
  IoEllipsisHorizontal,
  IoChatbubbleOutline,
  IoHeartOutline,
  IoStatsChart,
  IoRepeatSharp,
  IoBookmarkOutline,
  IoShareSocialOutline,
} from "react-icons/io5";

const Post = (props) => {
  return (
    <div className="flex w-full flex-row pr-4 pl-4 pt-3 pb-3 font-sans border-b-[1px]">
      <div className="flex w-[40px] mr-2">
        <img
          className="flex h-[40px] w-[40px] rounded-full object-cover"
          src={`./src/services/images-profile/${props.data.imageProfile}`}
        />
      </div>
      <main className="flex flex-[15] flex-col ">
        <div className="">
          <div className="flex h-[20px] w-full justify-between">
            <p className="font-bold text-sm">{props.data.user}</p>
            <div />
            <button>
              <IoEllipsisHorizontal />
            </button>
          </div>
          <div className="flex flex-col">
            <p className="text-left text-sm">{props.data.content}</p>
            <img
              className="flex rounded-xl object-cover mt-3"
              src={"./src/services/images-content/" + props.data.imageContent}
            />
            <div className="flex flex-row w-ful justify-between pt-3">
              <PostButton
                value={props.data.stat.comment}
                icon={<IoChatbubbleOutline className="text-icon size-[19px]" />}
              />
              <PostButton
                value={props.data.stat.retweet}
                icon={<IoRepeatSharp className="text-icon size-[19px]" />}
              />
              <PostButton
                value={props.data.stat.like}
                icon={<IoHeartOutline className="text-icon size-[19px]" />}
              />
              <PostButton
                value={props.data.stat.view}
                icon={<IoStatsChart className="text-icon size-[19px]" />}
              />

              <div className="flex flex-row space-x-4">
                <PostButton
                  value={null}
                  icon={<IoBookmarkOutline className="text-icon size-[19px]" />}
                />
                <PostButton
                  value={null}
                  icon={
                    <IoShareSocialOutline className="text-icon size-[19px]" />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const PostButton = (props) => {
  const reduceValue =
    props.value >= 1000000
      ? (props.value / 1000000).toFixed(0) + " M"
      : props.value >= 1000
      ? (props.value / 1000).toFixed(0) + " k"
      : props.value;

  return (
    <button className="flex items-center">
      <div className="active:bg-blue-100 rounded-full">{props.icon}</div>
      {props.value !== null && (
        <span className="text-icon pl-2 text-sm">{reduceValue}</span>
      )}
    </button>
  );
};

export default Post;

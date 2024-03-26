import { Link, useNavigate } from "react-router-dom";
import IconButton from "./button/IconButton";

import ActionButtons from "./ActionsButtons";

const Post = (props) => {
  const navigate = useNavigate();

  const handleMoreDetail = (e) => {
    e.preventDefault();
    props.setSelectedPost(props.data);
  };

  const toParameters = "/" + props.data.username + "/status/" + props.data.id;

  const handleGoToUserProfile = (e) => {
    e.preventDefault();
    navigate("/" + props.data.username);
  };

  return (
    <Link
      className="flex w-full flex-row pr-4 pl-4 pt-3 font-sans border-b-[1px] cursor-pointer"
      to={toParameters}
      state={{ data: props.data }}
    >
      <div className="flex w-[40px] mr-2" onClick={handleGoToUserProfile}>
        <img
          className="flex h-[40px] w-[40px] rounded-full object-cover"
          src={`./src/services/images-profile/${props.data.imageProfile}`}
        />
      </div>
      <main className="flex flex-[15] flex-col">
        <div className="">
          <div className="flex h-[20px] w-full justify-between">
            <p onClick={handleGoToUserProfile} className="font-bold text-sm">
              {props.data.user}
              <span className="text-icon-default-color font-normal">
                {" "}
                @{props.data.username}
              </span>
            </p>
            <div />
            <IconButton
              name="more"
              styles="hover:bg-iconBackgroundHover"
              tooltip="postMoreDetails"
              color={"#54b3f3"}
              background={"#e9f6fd"}
              event={handleMoreDetail}
              value={null}
            />
          </div>
          <div className="flex flex-col mt-1">
            <p className="text-left text-sm">{props.data.content}</p>
            <Link
              to={
                "/" +
                props.data.username +
                "/status/" +
                props.data.id +
                "/photo/"
              } // TODO multiple photo
              state={{ image: props.data.imageContent }}
            >
              <img
                className="flex rounded-xl object-cover mt-3"
                src={"./src/services/images-content/" + props.data.imageContent}
              />
            </Link>
            <ActionButtons view="menu" data={props.data.stat} />
          </div>
        </div>
      </main>
    </Link>
  );
};

export default Post;

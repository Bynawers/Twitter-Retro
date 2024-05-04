import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "./button/IconButton";

import ActionButtons from "./ActionsButtons";

import twitterConfig from "../../twitterConfig.json";

import { useAuth } from "../hooks/AuthProvider";

const BASE_URL = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL + "/images"
  : twitterConfig.BASE_URL_ONLINE + "/images";

const Post = (props) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const textareaRef = useRef(null);

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    adjustTextareaHeight();
  }, [props.data.body]);

  useEffect(() => {
    if (!auth.user) {
      return;
    }
    if (!auth.user.likes || !auth.user.retweets || !auth.user.bookmarks) {
      return;
    }
  }, []);

  const toParametersPost =
    "/" +
    (props.data.author ? props.data.author.tag : "undefined") +
    "/status/" +
    props.data._id;

  const toParametersUser =
    "/" + (props.data.author ? props.data.author.tag : "undefined");

  const toParametersImage =
    "/" +
    (props.data.author ? props.data.author.tag : "undefined") +
    "/status/" +
    props.data._id +
    "/photo/";

  const handleMoreDetail = (e) => {
    e.preventDefault();
    props.setSelectedPost(props.data);
  };

  const handleGoToUserProfile = (e) => {
    e.preventDefault();
    navigate("/" + (props.data.author ? props.data.author.tag : "undefined"));
  };

  const handleImageError = () => {
    setImageError(true);
  };

  function adjustTextareaHeight() {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Réinitialise la hauteur à auto pour recalculer la taille en fonction du contenu
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Ajuste la hauteur en fonction du contenu
    }
  }

  return (
    <Link
      className="flex w-full flex-row pr-4 pl-4 pt-3 font-sans border-b-[1px] cursor-pointer"
      to={toParametersPost}
      state={{ data: props.data }}
    >
      <Link
        className="flex w-[40px] mr-2"
        to={toParametersUser}
        state={{ data: props.data.author }}
      >
        <img
          className="flex h-[40px] w-[40px] rounded-full object-cover"
          src={
            BASE_URL +
            "/profile/" +
            (props.data.author ? props.data.author._id : "undefined")
          }
        />
      </Link>
      <main className="flex flex-[15] flex-col">
        <div className="">
          <div className="flex h-[20px] w-full justify-between ">
            <p onClick={handleGoToUserProfile} className="font-bold text-sm">
              {props.data.author ? props.data.author.fullName : "undefined"}
              <span className="text-icon-default-color font-normal">
                {" "}
                @{props.data.author ? props.data.author.tag : "undefined"}
              </span>
            </p>
            <div />
            <IconButton
              name="more"
              styles="hover:bg-iconBackgroundHover"
              tooltip="postMoreDetails"
              colorHover={"#54b3f3"}
              backgroundHover={"#e9f6fd"}
              event={handleMoreDetail}
              value={null}
            />
          </div>
          <div className="flex flex-col mt-1 ">
            <textarea
              readOnly
              ref={textareaRef}
              value={props.data.body}
              placeholder="What is happening?!"
              className="w-full leading-6 outline-none resize-none text-blackLight"
            />
            <Link
              to={toParametersImage}
              state={{ image: props.data.imageContent }}
            >
              {!imageError && (
                <img
                  className="flex rounded-xl object-cover mt-3"
                  src={BASE_URL + "/post/" + props.data._id}
                  onError={handleImageError}
                />
              )}
            </Link>
            <ActionButtons
              view="menu"
              post={props.data}
              data={props.data.stat}
              id={props.data._id}
              handleModifyStat={props.handleModifyStat}
            />
          </div>
        </div>
      </main>
    </Link>
  );
};

export default Post;

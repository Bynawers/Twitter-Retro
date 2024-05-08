import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "./button/IconButton";

import ActionButtons from "./ActionsButtons";

import twitterConfig from "../../twitterConfig.json";

import ModalPhoto from "./modal/ModalPhoto";

import Ago from "../utils/Ago";

import { useAuth } from "../hooks/AuthProvider";

const BASE_URL = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL + "/images"
  : twitterConfig.BASE_URL_ONLINE + "/images";

const Post = (props) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const textareaRef = useRef(null);

  const [imageError, setImageError] = useState(false);
  const [modalPhoto, setModalPhoto] = useState(false);

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

  const handlePostClick = (e) => {
    e.preventDefault();
    navigate(toParametersPost, { state: { data: props.data } });
  };

  if (!props.data.author) {
    return;
  }

  return (
    <>
      <div className="flex w-full flex-row pr-4 pl-4 pt-3 font-sans border-b-[1px] cursor-pointer">
        <div
          className="absolute h-[120px] w-[90%] z-10"
          onClick={handlePostClick}
        />
        <Link
          className="flex h-[40px] w-[40px] mr-2 z-20"
          to={toParametersUser}
          state={{ data: props.data.author }}
        >
          <img
            className="flex h-[40px] w-[40px] rounded-full object-cover "
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
                  {" · "}
                  {Ago(props.data.createdAt)}
                </span>
              </p>
              <div />
              {props.data.author.tag == auth.user.tag && (
                <IconButton
                  name="more"
                  styles="hover:bg-iconBackgroundHover"
                  tooltip="postMoreDetails"
                  colorHover={"#54b3f3"}
                  backgroundHover={"#e9f6fd"}
                  event={handleMoreDetail}
                  value={null}
                />
              )}
            </div>
            <div className="flex flex-col mt-1 ">
              <textarea
                readOnly
                ref={textareaRef}
                value={props.data.body}
                placeholder="What is happening?!"
                className="w-full cursor-pointer leading-6 outline-none resize-none text-blackLight"
              />
              <Link
                state={{ image: props.data.imageContent }}
                onClick={() => setModalPhoto(true)}
                className="z-20"
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
      </div>
      <ModalPhoto
        modalIsOpen={modalPhoto}
        setIsOpen={setModalPhoto}
        id={props.data._id}
      />
    </>
  );
};

export default Post;

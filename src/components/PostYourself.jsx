import { useState, useRef, useEffect } from "react";
import config from "../../twitterConfig.json";
import IconButton from "./button/IconButton";
import ClassicButton from "../components/button/ClassicButton";
import { createTweet } from "../services/RequestTweets";

const PostYourself = (props) => {
  const postRef = useRef(null);
  const fileInputRef = useRef(null);

  const [focus, setFocus] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    if (e.target.value.length <= config.tweet_limite_size) {
      setText(e.target.value);
    }
  };

  useEffect(() => {
    if (props.isComment) {
      postRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (postRef.current == null) {
      return;
    }

    const textArea = postRef.current;

    const adjustHeight = () => {
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
    };
    adjustHeight();
  }, [text]);

  const deleteImage = () => {
    setImage(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setFile(file);
  };

  const selectImage = () => {
    fileInputRef.current.click();
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleComment = async () => {
    if (text === "") {
      alert("text empty");
      return;
    }
    const formData = new FormData();
    formData.append("body", text);
    formData.append("type", "reply");
    formData.append("image", file);
    formData.append("replyId", props.id);

    const response = await createTweet(formData);
    setText("");
    setImage(null);
    setFocus(false);
    setFile(null);

    /*
    if (response.status === 201) {
      const newTweet = {
        author: auth.user,
        body: text,
        type: "tweet",
        _id: response.data.tweetId,
        stat: {
          view: 0,
          retweet: 0,
          like: 0,
          bookmark: 0,
          comment: 0,
        },
      };

      const updatedUser = {
        ...auth.user,
        tweets: response.data.userTweets,
        stat: response.data.userStat,
      };
      updateUser(updatedUser);
      addPostedTweet(newTweet);
      toast.success("Tweet posted successfully");
    } else {
      toast.error("An error has occurred");
    }*/
    //closeModal();
  };

  return (
    <div className="flex h-auto pt-1 pl-4 pr-4 border-b">
      <div className="flex h-full w-[40px] mr-2 pt-4">
        <img
          className="flex h-[40px] w-[40px] rounded-full object-cover"
          src="/src/assets/defaultAvatar.png"
        />
      </div>
      <div className="flex w-full h-auto justify-between items-center outline-none">
        <div className="flex flex-col justify-end items-end w-full h-full pt-4 pb-3 text-xl ">
          <textarea
            value={text}
            onChange={handleChange}
            onFocus={handleFocus}
            ref={postRef}
            placeholder="Postez votre réponse"
            className="w-full h-full outline-none overflow-hidden resize-none text-blackLight focus:outline-none"
          />
          <div className="relative w-full h-auto pb-4">
            {image && (
              <div className="absolute top-2 right-2">
                <IconButton name="close" color="white" event={deleteImage} />
              </div>
            )}
            <img src={image} className="rounded-2xl object-cover" />
          </div>

          {focus && (
            <div className="flex items-center w-full space-between space-x-2">
              <span
                className="text-sm font-base text-icon-default-color"
                style={{
                  color: text.length === config.tweet_limite_size ? "red" : "",
                }}
              >
                {text.length}/{config.tweet_limite_size}
              </span>
              <input
                type="file"
                accept="image/jpeg, image/png"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />

              <div className="flex flex-1" />
              <div className="flex space-x-2 items-center">
                <IconButton
                  name="image"
                  color="#00ADED"
                  backgroundHover={"#e9f6fd"}
                  event={selectImage}
                />
                <ClassicButton
                  text="Répondre"
                  color="twitter"
                  event={handleComment}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostYourself;

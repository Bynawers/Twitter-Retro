import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../hooks/AuthProvider";

import Modal from "react-modal";
import IconButton from "../button/IconButton";
import config from "../../../twitterConfig.json";

import { createTweet } from "../../services/RequestTweets";
import { ToastContainer, toast } from "react-toastify";

const customStyles = {
  content: {
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: 600,
    transform: "translate(-50%, -50%)",
    padding: 0,
    borderRadius: 10,
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
};

const ModalPost = (props) => {
  const auth = useAuth();
  const postRef = useRef(null);
  const fileInputRef = useRef(null);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = () => {
    setImage(null);
  };

  function closeModal() {
    setText("");
    props.setIsOpen(false);
  }

  const selectImage = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    if (e.target.value.length <= config.tweet_limite_size) {
      setText(e.target.value);
    }
  };

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("body", text);
    formData.append("type", "tweet");
    formData.append("author", auth.user._id);
    formData.append("tag", auth.user.tag);
    formData.append("image", image);
    if (await createTweet(formData)) {
      toast.success("Tweet posted successfully");
    } else {
      toast.error("An error has occurred");
    }
    closeModal();
  };

  return (
    <div>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Post"
      >
        <div className="flex h-[53px] px-4">
          <div className="w-full">
            <IconButton
              name="close"
              styles=" size-[40px] "
              event={closeModal}
            />
          </div>
        </div>
        <div className="flex px-3 pt-1 h-auto">
          <div className="flex flex-col px-4 w-full">
            <div className="flex w-full">
              <div className="w-[40px] pt-3 mr-2 h-full">
                <img
                  src="/src/assets/defaultAvatar.png"
                  className="rounded-full object-cover"
                />
                <div className="h-full w-full"></div>
              </div>
              <div className="flex flex-col justify-end items-end w-full h-full pt-4 pb-3 text-xl">
                <textarea
                  value={text}
                  onChange={handleChange}
                  ref={postRef}
                  placeholder="What is happening?!"
                  className="w-full h-full outline-none overflow-hidden resize-none text-blackLight"
                />
                <span
                  className="text-sm font-base text-icon-default-color pt-2"
                  style={{
                    color:
                      text.length === config.tweet_limite_size ? "red" : "",
                  }}
                >
                  {text.length}/{config.tweet_limite_size}
                </span>
                <img src={image} className="rounded-2xl object-cover" />
                {image && (
                  <button
                    className="text-sm mt-2 mr-3 px-3 py-1 rounded-xl bg-transparent hover:text-red-400 transition-colors duration-300"
                    onClick={deleteImage}
                  >
                    Effacer
                  </button>
                )}
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between py-2 w-full h-[55px] border-t-[1px]">
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <IconButton
                  name="image"
                  color="#00ADED"
                  background={"#e9f6fd"}
                  event={selectImage}
                />
                <button
                  className="bg-twitter hover:bg-twitterDark px-5 rounded-3xl font-bold text-white text-medium"
                  onClick={handlePost}
                >
                  <span>Post</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default ModalPost;

//h-[128px]

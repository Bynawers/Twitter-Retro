import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import IconButton from "../button/IconButton";
import config from "../../../twitterConfig.json";

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
  const postRef = useRef(null);
  const [text, setText] = useState("");

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

  function openModal() {
    props.setIsOpen(true);
  }

  function closeModal() {
    setText("");
    props.setIsOpen(false);
  }

  const handleChange = (e) => {
    if (e.target.value.length <= config.tweet_limite_size) {
      setText(e.target.value);
    }
  };

  const handlePost = () => {
    alert("post");
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
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-end py-2 w-full h-[55px] border-t-[1px]">
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
    </div>
  );
};

export default ModalPost;

//h-[128px]

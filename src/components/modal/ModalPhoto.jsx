import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import Modal from "react-modal";

import twitterConfig from "../../../twitterConfig.json";

import IconButton from "../button/IconButton";

const BASE_URL = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL + "/images/"
  : twitterConfig.BASE_URL_ONLINE + "/images/";

const customStyles = {
  content: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    border: 0,
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "transparent",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
};

const ModalPhoto = (props) => {
  const auth = useAuth();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  function closeModal() {
    props.setIsOpen(false);
  }

  return (
    <Modal
      isOpen={props.modalIsOpen}
      style={customStyles}
      contentLabel="Edit"
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <div
        style={{
          position: "absolute",
          width: "80%",
          bottom: "5%",
          left: "10%",
        }}
      >
        <div>
          {!imageError && (
            <img
              className="flex h-[85%] object-cover"
              src={BASE_URL + "/post/" + props.id}
              onError={handleImageError}
            />
          )}
        </div>
      </div>
      <div className="absolute top-5 left-5">
        <IconButton name="close" event={closeModal} color="white" />
      </div>
    </Modal>
  );
};

export default ModalPhoto;

//h-[128px]

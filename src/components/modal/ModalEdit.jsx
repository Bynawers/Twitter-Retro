import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";

import IconButton from "../button/IconButton";
import ClassicButton from "../button/ClassicButton";
import config from "../../../twitterConfig.json";

import { setUser, setBanner } from "../../services/RequestUsers";
import twitterConfig from "../../../twitterConfig.json";
import ClassicInput from "../button/ClassicInput";

const BASE_URL_IMAGE = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL + "/images/"
  : twitterConfig.BASE_URL_ONLINE + "/images/";

const customStyles = {
  content: {
    left: "50%",
    right: "auto",
    bottom: "auto",
    maxHeight: "80%",
    width: 600,
    transform: "translate(-50%, 10%)",
    borderRadius: 10,
    padding: 0,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
};

const ModalEdit = (props) => {
  const auth = useAuth();

  const [newProfileFile, setNewProfileFile] = useState(null);
  const [newBannerFile, setNewBannerFile] = useState(null);

  const [newBanner, setNewBanner] = useState(null);
  const [newProfile, setNewProfile] = useState(null);
  const [newName, setNewName] = useState("");
  const [newBio, setNewBio] = useState("");

  function closeModal() {
    setNewName("");
    setNewBio("");
    setNewProfile(null);
    setNewBanner(null);
    setNewProfileFile(null);
    setNewBannerFile(null);
    props.setIsOpen(false);
  }

  const handleSave = async () => {
    const formDataUser = new FormData();
    const formDataBanner = new FormData();
    if (newName !== "") {
      formDataUser.append("name", newName);
    }
    if (newBio !== "") {
      formDataUser.append("bio", newBio);
    }
    if (newProfileFile !== null) {
      formDataUser.append("profile", newProfileFile);
    }
    if (newBannerFile !== null) {
      formDataBanner.append("banner", newBannerFile);
      const bannerModify = await setBanner(formDataBanner);
    }

    const userModify = await setUser(formDataUser);

    if (userModify) {
      closeModal();
      toast.success("Tweet posted successfully");
    } else {
      toast.error("An error has occurred");
    }
  };

  return (
    <>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit"
      >
        <div className="sticky h-[53px] pt-2 px-4 bg-opacity-70 bg-white backdrop-filter backdrop-blur-md">
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center space-x-6">
              <IconButton
                name="close"
                styles=" size-[40px] "
                event={closeModal}
              />
              <span className="text-lg font-bold">Edit profile</span>
            </div>
            <ClassicButton color="black" event={handleSave} text="Save" />
          </div>
        </div>
        <main className="flex flex-col pt-1">
          <div className="flex flex-col px-4 w-full">
            <div className="flex flex-1 flex-col w-full h-auto">
              <div className="relative w-full min-h-[200px] bg-banner">
                {auth.user.bannerImage ||
                  (newBanner && (
                    <img
                      src={
                        newBanner
                          ? newBanner
                          : BASE_URL_IMAGE +
                            "banner/" +
                            (props.data ? props.data.tag : "undefined")
                      }
                      className="w-full h-[200px] object-cover"
                    />
                  ))}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <IconButton
                    name="camera"
                    color="white"
                    colorHover="white"
                    background="rgb(0, 0, 0, 0.5)"
                    backgroundHover="rgb(0, 0, 0, 0.3)"
                    size={25}
                    type="input"
                    setImage={setNewBanner}
                    setFile={setNewBannerFile}
                  />
                </div>
              </div>

              <div className=" w-full px-4 pt-3 mb-4">
                <div className="flex justify-between w-full h-[70px]">
                  <div className="relative h-[140px] bottom-[60px] w-[140px] rounded-full bg-foreground border-4 border-white z-0">
                    <img
                      src={
                        newProfile
                          ? newProfile
                          : BASE_URL_IMAGE +
                            "profile/" +
                            (props.data ? props.data._id : "undefined")
                      }
                      className="rounded-full w-full object-cover"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <IconButton
                        name="camera"
                        color="white"
                        colorHover="white"
                        background="rgb(0, 0, 0, 0.5)"
                        backgroundHover="rgb(0, 0, 0, 0.3)"
                        size={25}
                        type="input"
                        setImage={setNewProfile}
                        setFile={setNewProfileFile}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full px-4 pb-10">
            <ClassicInput
              current={newName.length}
              limit={config.name_limite_size}
              name="Name"
              value={newName}
              setValue={setNewName}
            />

            <div className="mt-4" />

            <ClassicInput
              type="area"
              current={newBio.length}
              limit={config.bio_limite_size}
              name="Bio"
              value={newBio}
              setValue={setNewBio}
            />
          </div>
        </main>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ModalEdit;

//h-[128px]

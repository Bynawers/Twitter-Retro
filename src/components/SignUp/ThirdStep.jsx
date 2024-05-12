import React, { useState } from "react";

const PersonalInfo = (props) => {
  const [avatar, setAvatar] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    props.setProfilePicture(file);
  };

  return (
    <div className="pb-10">
      <input
        type="text"
        className="block border border-grey-light w-full p-3 rounded mb-10"
        style={{ borderColor: props.errorTag ? "red" : "#d1d5db" }}
        name="tag"
        placeholder="Tag"
        value={props.formData.tag}
        onChange={(e) => {
          props.setFormData({ ...props.formData, tag: e.target.value });
        }}
      />
      <label htmlFor="avatar">Choose a profile picture:</label>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default PersonalInfo;

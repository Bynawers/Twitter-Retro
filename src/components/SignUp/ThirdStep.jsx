import React, { useState } from "react";

export default function PersonalInfo({ formData, setFormData }) {
  const [avatar, setAvatar] = useState(null);

  const handleFileChange = (e) => {
    // Access the file from event
    const file = e.target.files[0];
    setAvatar(file);
    
    // Update formData to include avatar file
    setFormData({ ...formData, avatar: file });
  };

  return (
    <div className="pb-10">
      <input
        type="text"
        className="block border border-grey-light w-full p-3 rounded mb-10"
        name="tag"
        placeholder="Tag"
        value={formData.tag}
        onChange={(e) => {
          setFormData({ ...formData, tag: e.target.value });
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
}

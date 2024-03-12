import React from "react";

function OtherInfo({ formData, setFormData }) {
  return (
    <div>
      <input
        type="password"
        className="block border border-grey-light w-full p-3 rounded mb-2"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => {
          setFormData({ ...formData, password: e.target.value });
        }}
      />

      <input
        type="password"
        className="block border border-grey-light w-full p-3 rounded mb-2"
        name="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) => {
          setFormData({ ...formData, confirmPassword: e.target.value });
        }}
      />
    </div>
  );
}

export default OtherInfo;

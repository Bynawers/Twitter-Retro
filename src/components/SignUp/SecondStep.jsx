import React from "react";

const OtherInfo = (props) => {
  return (
    <div>
      <input
        type="password"
        className="block border border-grey-light w-full p-3 rounded mb-2"
        style={{ borderColor: props.errorPassword ? "red" : "#d1d5db" }}
        name="password"
        placeholder="Password"
        value={props.formData.password}
        onChange={(e) => {
          props.setFormData({ ...props.formData, password: e.target.value });
        }}
      />

      <input
        type="password"
        className="block border border-grey-light w-full p-3 rounded mb-2"
        style={{ borderColor: props.errorConfirmPassword ? "red" : "#d1d5db" }}
        name="password"
        placeholder="Confirm Password"
        value={props.formData.confirmPassword}
        onChange={(e) => {
          props.setFormData({
            ...props.formData,
            confirmPassword: e.target.value,
          });
        }}
      />
    </div>
  );
};

export default OtherInfo;

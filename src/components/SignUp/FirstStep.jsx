import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SignUpInfo = (props) => {
  const [dob, setDob] = useState(null);

  const handleDateChange = (date) => {
    setDob(date);
    props.setFormData({ ...props.formData, dob: date });
  };

  return (
    <div>
      <input
        type="text"
        className="block border border-gray-300 w-full p-3 rounded mb-2"
        style={{ borderColor: props.errorFullname ? "red" : "#d1d5db" }}
        name="fullname"
        placeholder="Full Name"
        value={props.formData.fullName}
        onChange={(e) => {
          props.setFormData({ ...props.formData, fullName: e.target.value });
        }}
      />

      <input
        type="text"
        className="block border border-gray-300 w-full p-3 rounded mb-10"
        style={{ borderColor: props.errorEmail ? "red" : "#d1d5db" }}
        name="email"
        placeholder="Email"
        value={props.formData.email}
        onChange={(e) => {
          props.setFormData({ ...props.formData, email: e.target.value });
        }}
      />

      <div className="text-gray-600 mb-2">
        Date of birth
        <p className="text-xs">
          This will not be shown publicly. Confirm your own age, even if this{" "}
          <br />
          account is for a business, a pet, or something else.
        </p>
      </div>

      <DatePicker
        className="block border border-grey-light w-full p-3 rounded mb-2"
        selected={dob}
        onChange={handleDateChange}
      />
    </div>
  );
};
export default SignUpInfo;

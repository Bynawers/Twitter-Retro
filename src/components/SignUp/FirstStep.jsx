import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SignUpInfo({ formData, setFormData }) {
  const [dob, setDob] = useState(null);

  const handleDateChange = (date) => {
    setDob(date);
    setFormData({ ...formData, dob: date });
  };

  return (
    <div>
      <input
        type="text"
        className="block border border-grey-light w-full p-3 rounded mb-2"
        name="fullname"
        placeholder="Full Name"
        value={formData.fullname}
        onChange={(e) => {
          setFormData({ ...formData, fullName: e.target.value });
        }}
      />

      <input
        type="text"
        className="block border border-grey-light w-full p-3 rounded mb-10"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => {
          setFormData({ ...formData, email: e.target.value });
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
}
export default SignUpInfo;

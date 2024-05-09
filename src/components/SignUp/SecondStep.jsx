import React from "react";
import PasswordChecklist from "react-password-checklist";
import { toast } from "react-toastify";

const OtherInfo = (props) => {
  const { formData, setFormData } = props;
  const [errorPassword, setErrorPassword] = React.useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = React.useState(false);

  return (
    <div>
      <input
        type="password"
        className="block border border-grey-light w-full p-3 rounded mb-2"
        style={{ borderColor: errorPassword ? "red" : "#d1d5db" }}
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
        style={{ borderColor: errorConfirmPassword ? "red" : "#d1d5db" }}
        name="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) => {
          setFormData({
            ...formData,
            confirmPassword: e.target.value,
          });
        }}
      />
      <div className="mt-4 mb-4">
        <PasswordChecklist
          rules={["minLength", "specialChar", "number", "capital", "match"]}
          minLength={5}
          value={formData.password}
          valueAgain={formData.confirmPassword}
        />
      </div>
    </div>
  );
};

export default OtherInfo;

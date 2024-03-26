import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignUpInfo from "./FirstStep";
import PersonalInfo from "./ThirdStep";
import OtherInfo from "./SecondStep";

import { signupUser } from "../../services/RequestUsers";

const SignUpForm = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    tag: "",
    dob: "",
    avatar: "",
  });

  const handleNextStep = () => {
    if (
      props.step == 0 &&
      (formData.email === "" || formData.fullName === "")
    ) {
      toast.error("Please enter your email and fullname");
      return;
    } else if (
      props.step == 1 &&
      formData.password !== formData.confirmPassword
    ) {
      toast.error("Passwords not matching");
      return;
    } else if (props.step === 2) {
      handleSubmit();
    }

    props.setStep(props.step + 1);
  };

  const handlePreviousStep = () => {};

  const handleSubmit = () => {
    signupUser(formData);
  };

  const FormTitles = ["Sign Up", "Personal Info", "Other"];

  const StepContent = {
    0: <SignUpInfo formData={formData} setFormData={setFormData} />,
    1: <OtherInfo formData={formData} setFormData={setFormData} />,
    2: <PersonalInfo formData={formData} setFormData={setFormData} />,
  };

  return (
    <div>
      <div className="form-container">
        <div className="body">{StepContent[props.step]}</div>
        <div className="footer">
          <button
            type="button"
            className="w-full h-12 text-center py-3 rounded-full bg-blue-500 text-white hover:bg-green-dark focus:outline-none"
            onClick={handleNextStep}
          >
            {props.step === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUpForm;

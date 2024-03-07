import React, { useState } from "react";
import SignUpInfo from "./FirstStep";
import PersonalInfo from "./ThirdStep";
import OtherInfo from "./SecondStep";

export default function SignUpForm() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    tag: "",
    dob: "",
    avatar: "",
  });

  function handleSubmit () {
    if (page === 0) {
      if (formData.email == '' ) {
        return alert('Please enter your name');
      } else {
        setPage(page + 1);
        console.log(formData);
      }

    } else if (page === 1) {
      // do form validation again
      if (formData.password != formData.confirmPassword ) {
        return alert('password not matching');
      } else {
        setPage(page + 1);
        console.log(formData);
      }
    } else if (page === 2) {
      // set page === 0 , and clear fields
    } else setPage(page + 1);
  }

  const FormTitles = ["Sign Up", "Personal Info", "Other"];

  const PageDisplay = () => {
    if (page === 0) {
      return <SignUpInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <OtherInfo formData={formData} setFormData={setFormData} />;
    } else {
      return <PersonalInfo formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <div >
      <div className="form-container">
        <div className="body">{PageDisplay()}</div>
        <div className="footer">
        <button
        type="button"
        className="w-full h-12 text-center py-3 rounded-full bg-blue-500 text-white hover:bg-green-dark focus:outline-none"
        onClick={() => {
          if (page === FormTitles.length - 1) {
            alert("FORM SUBMITTED");
            console.log(formData);
          } else {
            handleSubmit()
          }
        }}
      >
        {page === FormTitles.length - 1 ? "Submit" : "Next"}
      </button>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import SignUpInfo from "./FirstStep";
import PersonalInfo from "./ThirdStep";
import OtherInfo from "./SecondStep";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUpForm() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    tag: "",
    dob: "",
    avatar: "",
  });

  const handleSubmit = async () => {
    try {
      if (page === 0) {
        if (formData.email === "" || formData.fullName === "") {
          toast.error("Please enter your email and fullname");
          return;
        }
      } else if (page === 1) {
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords not matching");
          return;
        }
      } else if (page === 2) {
        // Reset form data or perform any other actions here
      }

      if (page === 2) {
        const response = await fetch("http://localhost:3001/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success("Form Submitted");
          console.log(formData);
        } else {
          throw new Error("Failed to submit form");
        }
      }

      setPage(page + 1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit form");
    }
  };

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
    <div>
      <div className="form-container">
        <div className="body">{PageDisplay()}</div>
        <div className="footer">
          <button
            type="button"
            className="w-full h-12 text-center py-3 rounded-full bg-blue-500 text-white hover:bg-green-dark focus:outline-none"
            onClick={handleSubmit}
          >
            {page === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

import { useState, React } from "react";

import "react-datepicker/dist/react-datepicker.css";
import SignUpForm from "./SignUpForm.jsx";
import IconButton from "../button/IconButton";

const ModalSignup = () => {
  const [step, setStep] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setStep(0);
    setShowModal(false);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <>
      <div className="w-full md:w-3/4">
        <p className="mt-2 text-sm text-gray-600 py-3">
          Don't have an account?{" "}
        </p>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="w-full h-12 px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Sign In
        </button>

        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative  my-6 mx-auto max-w-5xl w-1/3 max-md:w-full">
                <div className="p-9 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none overflow-y-auto">
                  <div className="flex justify-between items-center">
                    {step > 0 ? (
                      <IconButton
                        name="back"
                        event={handlePreviousStep}
                        size={30}
                      />
                    ) : (
                      <div />
                    )}
                    <IconButton
                      name="close"
                      event={handleCloseModal}
                      size={30}
                    />
                  </div>

                  <div className="flex justify-center items-center mb-4">
                    <IconButton name="twitter" event={null} hover={false} />
                  </div>
                  <SignUpForm step={step} setStep={setStep} />
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </>
  );
};
export default ModalSignup;

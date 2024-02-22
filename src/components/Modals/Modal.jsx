import { useState, React } from "react";
import DatePicker from "react-datepicker";
import twitterLogo from "../../assets/twitter.png";
import "react-datepicker/dist/react-datepicker.css";

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <div className="w-full md:w-3/4 self-">
    <p className="mt-2 text-sm text-gray-600">
                Don't have an account?{" "}
      </p>
    <button
        
        type="button"
        onClick={() => setShowModal(true)}
        className="w-full  px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      >
        Sign In
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              {/*content*/}
              <div
                className="p-9 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
                style={{ maxHeight: "80vh", overflowY: "auto" }}
              >
                {/* Close button */}
                <button
                  className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800"
                  onClick={handleCloseModal}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                {/*header*/}
                <div className="flex justify-center items-center mb-4">
                  <img src={twitterLogo} alt="twitter logo" className="w-7" />
                </div>
                <div>
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-2"
                    name="fullname"
                    placeholder="Full Name"
                  />

                  <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-10"
                    name="email"
                    placeholder="Email"
                  />

                  <div className="text-gray-600 mb-2">
                    Date of birth
                    <p className="text-xs">
                      This will not be shown publicly. Confirm your own age,
                      even if this <br />account is for a business, a pet, or
                      something else.
                    </p>
                  </div>

                  <DatePicker
                    className="block border border-grey-light w-full p-3 rounded mb-2"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />

                  <button
                    type="button"
                    className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-green-dark focus:outline-none"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
      

    </>
  );
}
export { Modal };

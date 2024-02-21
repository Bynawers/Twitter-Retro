import twitterLogo from "../assets/twitter.png";
import { useState } from "react";
import { Modal } from "../components/Modals/Modal.jsx";

function Login() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.email !== "" && input.password !== "") {
      console.log(input.email +" "+ input.password)
      // dispatch action from hooks
    } else {
      alert("Please provide a valid input");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/2 flex justify-center items-center">
          <img src={twitterLogo} alt="twitter logo" className="max-w-full" />
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <form onSubmit={handleSubmitEvent} className="w-3/4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                value={input.email}
                onChange={handleInput}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onChange={handleInput}
                value={input.password}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="******************"
              />
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input type="checkbox" id="rememberMe" className="mr-2" />
                  <label
                    htmlFor="rememberMe"
                    className="text-sm font-bold text-gray-700 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm font-bold text-blue-500 hover:text-blue-800"
                >
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
              <p className="mt-2 text-sm text-gray-600">
                Don't have an account?{" "}
              </p>
              <Modal></Modal>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}



export default Login;

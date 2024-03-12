import twitterLogo from "../assets/twitter.png";
import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { Modal } from "../components/SignUp/ModalSignup";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.email !== "" && input.password !== "") {
      console.log(input.email + " " + input.password);
      //console.log(input);
      auth.loginAction(input);
    } else {
      toast.error("Please provide a valid input");
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
      <div className="flex px-6 flex-col md:flex-row h-screen max-md:pt-20">
        <div className="max-md:w-1/2 md:w-1/2 flex justify-center items-center">
          <img src={twitterLogo} alt="twitter logo" className="w-2/3" />
        </div>
        <div className="md:w-1/2 flex flex-col items-center justify-center py-8 md:mx-auto md:h-screen lg:py-0">
          <h1 className="max-md:text-6xl max-md:self-start mb-20 w-3/4 font-bold text-4xl text-gray-700">
            Happening now.
          </h1>
          <form onSubmit={handleSubmitEvent} className="mb-10 w-full md:w-3/4">
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
                className="shadow appearance-none h-12 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow h-12 appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="******************"
              />
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input type="checkbox" id="rememberMe" className=" mr-2" />
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
                className="w-full h-12 px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
          </form>
          <ToastContainer></ToastContainer>

          <Modal></Modal>
        </div>
      </div>
    </>
  );
}

export default Login;

import React, { useState } from "react";
import loginImage from "../Images/loginImage.jpeg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerNewUser } from "@/features/UserSlice";
import Logo from "../Images/Logo_purple_background.png";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    city: "",
    contact: "",
    password: "",
    role: "customer",
  });
  const [cPassword, setCPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const onChangeCPassword = (e) => {
    setCPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newUser.password === cPassword) {
      console.log("The new user for registration is: ", newUser);
      let response = await dispatch(registerNewUser({ data: newUser }));
      // if(response.payload.action === "success"){
      if(response.meta.requestStatus === "fulfilled"){
        toast.success("Account has been created successfully!", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate('/')
        }, 2000);
      }
      else{
        toast.error(response.payload.error, {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      
    } else {
      toast.error("Keep your password and confirm password same", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex">
        <div className="w-full px-10 sm:px-24 lg:w-[50%] py-20 xl:px-20 lg:px-16 md:w-[56%] md:px-8">
          <div className="flex justify-center">
            <img
              src={Logo}
              className="w-[40%] sm:w-[35%] md:w-[30%]"
              alt="Logo"
            />
          </div>
          <h1 className="mt-10 text-center md:text-left text-2xl sm:text-3xl md:text-[28px] lg:text-3xl font-bold">
            Create your Account
          </h1>
          <h4 className="mt-1 text-center md:text-left text-[13px] sm:text-md text-gray-600 font-semibold">
            Register to create your Account
          </h4>
          <form action="" onSubmit={handleSubmit} className="pt-7">
            <div className="relative sm:col-span-4">
              <label
                htmlFor="username"
                className="leading-7 text-[17px] sm:text-lg md:text-[17px] lg:text-[17px] xl:text-lg font-semibold text-gray-800"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={newUser.username}
                onChange={onChange}
                placeholder="Enter your Username"
                className="w-full bg-gray-100 bg-opacity-40 mt-1 rounded border border-gray-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <div className="relative sm:col-span-4 mt-3">
              <label
                htmlFor="email"
                className="leading-7 text-[17px] sm:text-lg md:text-[17px] lg:text-[17px] xl:text-lg font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={newUser.email}
                onChange={onChange}
                placeholder="Enter your Email"
                className="w-full bg-gray-100 bg-opacity-40 mt-1 rounded border border-gray-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>

            <div className="mt-3 sm:flex gap-x-[4%]">
              <div className="sm:w-[44%]">
                <label
                  htmlFor="city"
                  className="leading-7 text-[17px] sm:text-lg md:text-[17px] lg:text-[17px] xl:text-lg font-semibold text-gray-800"
                >
                  City
                </label>
                <select
                  id="city"
                  name="city"
                  value={newUser.city} // Bind the value to newUser.city
                  onChange={onChange} // Use the same onChange handler
                  autoComplete="city-name"
                  className="w-full cursor-pointer bg-gray-100 bg-opacity-40 mt-1 rounded border border-gray-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                >
                  <option value="" disabled selected>
                    Select a city
                  </option>
                  <option>Lahore</option>
                  <option>Karachi</option>
                  <option>Islamabad</option>
                </select>
              </div>

              <div className="mt-3 sm:w-[52%] sm:mt-0">
                <label
                  htmlFor="city"
                  className="leading-7 text-[17px] sm:text-lg md:text-[17px] lg:text-[17px] xl:text-lg font-semibold text-gray-800"
                >
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={newUser.contact}
                  onChange={onChange}
                  placeholder="Contact No."
                  className="w-full bg-gray-100 bg-opacity-40 mt-1 rounded border border-gray-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            </div>

            <div className="relative sm:col-span-4 mt-3">
              <label
                htmlFor="password"
                className="leading-7 text-[17px] sm:text-lg md:text-[17px] lg:text-[17px] xl:text-lg font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={newUser.password}
                onChange={onChange}
                placeholder="Enter your Password"
                className="w-full bg-gray-100 bg-opacity-40 mt-1 rounded border border-gray-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <div className="relative sm:col-span-4 mt-3">
              <label
                htmlFor="cpassword"
                className="leading-7 text-[17px] sm:text-lg md:text-[17px] lg:text-[17px] xl:text-lg font-semibold text-gray-800"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="cpassword"
                name="cpassword"
                value={cPassword}
                onChange={onChangeCPassword}
                placeholder="Confirm your Password"
                className="w-full bg-gray-100 bg-opacity-40 mt-1 rounded border border-gray-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>

            <div className="w-full mt-8">
              <button
                type="submit"
                className="w-full text-center text-white text-lg lg:text-xl md:text-lg md:py-2 font-semibold bg-gradient-to-r from-blue-600 to-blue-800 border-0 py-3 lg:py-3 transition-all duration-300 ease-in-out focus:outline-none hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-600 hover:shadow-lg rounded"
              >
                Register
              </button>
            </div>
          </form>
          <div className="text-center mt-2">
            <p className="text-[13px] sm:text-md text-gray-600 font-semibold">
              Already have an Account?{" "}
              <span
                className="relative text-violet-600 cursor-pointer font-bold group"
                onClick={() => {
                  navigate("/Login");
                }}
              >
                Login
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-violet-600 origin-center scale-x-0 transform transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </span>
            </p>
          </div>

          {/* <div className="my-6 w-full flex items-center before:mt-0.5 before:flex-1 before:border-t-2 before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t-2 after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
            <a
              href="/"
              className="mx-4 mb-0 text-md md:text-[15px] text-gray-600 text-center font-semibold"
            >
              Or register with
            </a>
          </div> */}

          {/* <button className="w-full sm:text-lg lg:text-xl py-3 md:py-2 gap-x-3 justify-center text-gray-800 bg-transparent transition-all duration-300 items-center text-[18px] font-medium inline-flex border border-gray-400 rounded-md hover:bg-gray-50 hover:border-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 64 64"
              height="30px"
              width="24px"
            >
              <g fillRule="evenodd" fill="none" strokeWidth="1" stroke="none">
                <g fillRule="nonzero" transform="translate(3.000000, 2.000000)">
                  <path
                    fill="#4285F4"
                    d="M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782"
                  ></path>
                  <path
                    fill="#EB4335"
                    d="M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769"
                  ></path>
                </g>
              </g>
            </svg>
            <span className="">Sign Up with Google</span>
          </button> */}
        </div>
        <div className="hidden md:block md:w-[44%] lg:w-[50%]">
          <img src={loginImage} alt="" srcSet="" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Signup;

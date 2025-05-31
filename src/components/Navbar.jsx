"use client";
import React, { useState, useEffect } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { AiOutlineClose, AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { IoMdLock } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserDetails, logoutUser } from "@/features/UserSlice";
import Logo from "../Images/Logo_purple_background.png";
import {
  getChannelWiseTrendingTopics,
  getChannels,
} from "@/features/TopicsSlice";
import { ToastContainer, toast } from "react-toastify";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const { loggedInUser, loading, error } = useSelector((state) => state.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: "Trending Topics" },
    { id: 2, text: "Custom Topics" },
    { id: 3, text: "Login" },
    { id: 4, text: "Register Now" },
  ];

  const handleLogout = async () => {
    const response = await dispatch(logoutUser());
    console.log("The response on client side is:", response.payload.message);

    if (response.payload.message == "Logout successful") {
      // navigate("/Login");
      toast.success("You have been Logout Successfully!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
          navigate('/Login')
      }, 2000);
    } else {
      // alert("You have to logged in into the system");
      toast.error("You are not able to Logout!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const items = [
    {
      label: (
        <Link
          rel="noopener noreferrer"
          to="/AccountSettings"
          className="text-[16px] font-normal"
        >
          My Account Info
        </Link>
      ),
      key: "0",
    },
    // {
    //   label: (
    //     <a
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       href="https://www.aliyun.com"
    //       className="text-[16px] font-normal"
    //     >
    //       My Subscriptions
    //     </a>
    //   ),
    //   key: "1",
    // },
    {
      label: (
        <button className="text-[16px] font-normal" onClick={handleLogout}>
          Logout
        </button>
      ),
      key: "2",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
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

      <nav className="flex items-center justify-between w-full h-[100px] bg-white px-8 py-10">
        <div className="flex items-center gap-3">
          <img className="w-[40px]" src="./new logo.png" alt="" />
          <Link to="/" className="w-[17%]">
            <img src={Logo} className="w-full h-full" alt="Logo" />
          </Link>
        </div>
        <div className="">
          <ul className="lg:flex lg:gap-10 hidden font-medium items-center">
            <li className="relative group pr-1 hover:text-violet-600 transition duration-300 ease-in-out">
              <Link to="/TrendingTopics" className="flex items-center">
                Discover Trends
                {/* <span className="absolute bottom-0 w-full h-[2px] bg-violet-600 origin-center scale-x-0 transform transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span> */}
              </Link>
            </li>
            {/* <li className="relative group pr-1 hover:text-violet-600 transition duration-300 ease-in-out">
            <Link to="/CustomTopics" className="flex items-center">
              My Topics
            </Link>
          </li> */}
            {/* <li className="relative group pr-1 hover:text-violet-600 transition duration-300 ease-in-out">
            <Link to="/Register" className="flex items-center">
              Register
            </Link>
          </li> */}

            {loggedInUser ? (
              <Dropdown
                menu={{
                  items,
                }}
              >
                <div>
                  <Space className="group cursor-pointer">
                    <AiOutlineUser className="group-hover:text-violet-600 transition duration-300 ease-in-out" />
                    <p className="relative group pr-1 text-[17px] group-hover:text-violet-600 transition duration-300 ease-in-out">
                      {loggedInUser.username}
                    </p>
                    {/* <DownOutlined className="group-hover:text-violet-600 mt-2" /> */}
                  </Space>
                </div>
              </Dropdown>
            ) : (
              <li className="relative group pr-1 hover:text-violet-600 transition duration-300 ease-in-out">
                <Link to="/Register" className="flex items-center">
                  Register
                </Link>
              </li>
            )}
          </ul>

          {/* <div className='lg:hidden visible text-2xl'><a href=""><IoMenuSharp /></a></div> */}
          {/* Mobile Navigation Icon */}
          <div onClick={handleNav} className="lg:hidden visible cursor-pointer">
            {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          </div>

          {/* Mobile Navigation Menu */}
          <ul
            className={
              nav
                ? "fixed z-10 lg:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500"
                : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
            }
          >
            {/* Mobile Logo */}
            {/* <h1 className="text-3xl text-center my-5 font-semibold">LOGO</h1> */}
            <Link to="/" className="flex justify-center mt-10 mb-5">
              <img src={Logo} className="w-28" alt="Logo" />
            </Link>

            {/* Mobile Navigation Items */}
            <div className="flex flex-col">
              <Link
                to="/TrendingTopics"
                className="text-[17px] p-4 w-full rounded-e-full hover:bg-primary duration-300 ease-in-out font-semibold hover:text-purple-800 hover:bg-violet-300 cursor-pointer border-gray-600"
              >
                Discover Trends
              </Link>
              <Link
                to="/CustomTopics"
                className="text-[17px] p-4 w-full rounded-e-full hover:bg-primary duration-300 ease-in-out font-semibold hover:text-purple-800 hover:bg-violet-300 cursor-pointer border-gray-600"
              >
                My Topics
              </Link>
              {/* <Link
              to="/Login"
              className="text-[17px] p-4 w-full rounded-e-full hover:bg-primary duration-300 ease-in-out font-semibold hover:text-purple-800 hover:bg-violet-300 cursor-pointer border-gray-600"
            >
              Login
            </Link>
            <Link
              to="/Register"
              className="text-[17px] p-4 w-full rounded-e-full hover:bg-primary duration-300 ease-in-out font-semibold hover:text-purple-800 hover:bg-violet-300 cursor-pointer border-gray-600"
            >
              Register
            </Link> */}
              {/* User Account Dropdown */}
              {loggedInUser ? (
                <Dropdown
                  menu={{ items: items }}
                  trigger={["click"]}
                  className="text-[17px] p-4 w-full rounded-e-full hover:bg-primary duration-300 ease-in-out font-semibold hover:text-purple-800 hover:bg-violet-300 cursor-pointer border-gray-600"
                >
                  <div className="p-4 w-full rounded-e-full cursor-pointer border-gray-600 flex justify-between items-center">
                    <div className="flex">
                      <AiOutlineUser className="mr-2" />
                      <span className="group-hover:text-purple-800 -mt-1 font-semibold">
                        {loggedInUser.username}
                      </span>
                    </div>
                    <DownOutlined className="ml-0 mt-0" />
                  </div>
                </Dropdown>
              ) : (
                <Link
                  to="/Register"
                  className="text-[17px] p-4 w-full rounded-e-full hover:bg-primary duration-300 ease-in-out font-semibold hover:text-purple-800 hover:bg-violet-300 cursor-pointer border-gray-600"
                >
                  Register
                </Link>
              )}
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

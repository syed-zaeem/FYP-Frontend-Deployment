import { useState, useEffect } from "react";
import { Tabs } from "antd";
// import "antd/dist/antd.css"; // Import Ant Design styles
import { useSelector, useDispatch } from "react-redux";
import { updateUserDetails, updateUserPassword } from "@/features/UserSlice";
import { ToastContainer, toast } from "react-toastify";

const { TabPane } = Tabs;

const CustomerAccountInfo = () => {
  const { loggedInUser } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  // if (!loggedInUser) {
  //   return <div>Loading...</div>; // Or a spinner/placeholder
  // }

  // const [updatedUser, setUpdatedUser] = useState({
  //   id: loggedInUser.id,
  //   username: loggedInUser.username,
  //   email: loggedInUser.email,
  //   city: loggedInUser.profile.city,
  //   contact: loggedInUser.profile.contact,
  //   role: loggedInUser.profile.role
  // })

  // Fallback initialization to avoid undefined errors
  const [updatePasswordUser, setUpdatePasswordUser] = useState({
    previous_password: "",
    new_password: "",
    reenter_password: "",
  });
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    email: "",
    city: "",
    contact: "",
    role: "",
  });

  // Synchronize `updatedUser` with `loggedInUser` once it's available
  useEffect(() => {
    if (loggedInUser) {
      setUpdatedUser({
        username: loggedInUser.username,
        email: loggedInUser.email,
        city: loggedInUser.profile.city,
        contact: loggedInUser.profile.contact,
        role: loggedInUser.profile.role,
      });
    }
  }, [loggedInUser]);

  const onChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const newUpdatedUser = {
      username: updatedUser.username,
      email: updatedUser.email,
      profile: {
        city: updatedUser.city,
        contact: updatedUser.contact,
        role: updatedUser.role,
      },
    };

    let response = await dispatch(updateUserDetails(newUpdatedUser));

    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Changes has been saved successfully!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
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
  };

  const onChangePasswordUser = (e) => {
    setUpdatePasswordUser({
      ...updatePasswordUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    console.log("The passwords are: ", updatePasswordUser);
    if (
      updatePasswordUser.new_password === updatePasswordUser.reenter_password
    ) {
      let response = await dispatch(updateUserPassword(updatePasswordUser));

      if (response.payload.message === "Previous password is incorrect.") {
        toast.error("Current password is incorrect", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        if (response.meta.requestStatus === "fulfilled") {
          toast.success("Password updated successfully!", {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
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
      }
    } else {
      toast.error("Your new password and confirm password must be same", {
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
      <div className="sm:mx-[5%] md:mx-[10%] lg:mx-[15%] xl:mx-[18%] p-10 bg-white shadow-lg rounded-lg shadow-violet-300">
        <h1 className="text-2xl sm:text-3xl text-violet-600 font-bold mb-4 text-center">
          Account Settings
        </h1>
        <Tabs
          defaultActiveKey="1"
          tabBarStyle={{
            fontSize: "18px", // Customize font size
            fontWeight: 600, // Customize font weight
            color: "gray", // Default text color
            textTransform: "uppercase", // Transform text
          }}
        >
          {/* Tab 1: Account Info */}
          <TabPane tab="My Account Info" key="1">
            <form onSubmit={handleSaveChanges} action="" className="py-4">
              <div className="relative sm:col-span-4">
                <label
                  htmlFor="username"
                  className="leading-7 text-[17px] sm:text-lg md:text-[17px] lg:text-[17px] font-semibold text-gray-800"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={updatedUser.username}
                  onChange={onChange}
                  placeholder="Enter your Username"
                  className="w-full bg-gray-100 bg-opacity-40 mt-1 rounded border border-gray-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="relative sm:col-span-4 mt-3">
                <label
                  htmlFor="email"
                  className="leading-7 text-[17px] sm:text-lg md:text-[17px] lg:text-[17px] font-semibold text-gray-800"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={updatedUser.email}
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
                    className="leading-7 text-[17px] sm:text-lg md:text-[17px] lg:text-[17px] font-semibold text-gray-800"
                  >
                    City
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={updatedUser.city}
                    onChange={onChange}
                    autoComplete="city-name"
                    className="w-full cursor-pointer bg-gray-100 bg-opacity-40 mt-1 rounded border border-gray-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                  >
                    <option>Lahore</option>
                    <option>Karachi</option>
                    <option>Islamabad</option>
                  </select>
                </div>

                <div className="mt-3 sm:w-[52%] sm:mt-0">
                  <label
                    htmlFor="city"
                    className="leading-7 text-[17px] sm:text-lg md:text-[17px] lg:text-[17px] font-semibold text-gray-800"
                  >
                    Contact
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={updatedUser.contact}
                    onChange={onChange}
                    placeholder="Contact No."
                    className="w-full bg-gray-100 bg-opacity-40 mt-1 rounded border border-gray-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                  />
                </div>
              </div>

              <div className="w-full mt-8">
                <button
                  type="submit"
                  className="w-52 text-center text-white text-lg bg-violet-600 lg:text-xl md:text-lg md:py-2 font-semibold border-0 py-3 lg:py-3 hover:bg-violet-700 transition-all duration-300 ease-in-out focus:outline-none hover:shadow-lg rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </TabPane>

          {/* Tab 2: Manage Password */}
          <TabPane tab="Manage Password" key="2">
            <form onSubmit={handleSubmitPassword} action="" className="py-4">
              <div className="relative sm:col-span-4">
                <label
                  htmlFor="currentPassword"
                  className="leading-7 text-[17px] sm:text-lg md:text-[17px] lg:text-[17px] font-semibold text-gray-800"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="previous_password"
                  name="previous_password"
                  value={updatePasswordUser.previous_password}
                  onChange={onChangePasswordUser}
                  placeholder="Enter your Current Password"
                  className="w-full bg-gray-100 bg-opacity-40 mt-1 rounded border border-gray-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>

              <div className="relative sm:col-span-4 mt-3">
                <label
                  htmlFor="newPassword"
                  className="leading-7 text-[17px] sm:text-lg md:text-[17px] lg:text-[17px] font-semibold text-gray-800"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="new_password"
                  name="new_password"
                  value={updatePasswordUser.new_password}
                  onChange={onChangePasswordUser}
                  placeholder="Enter your New Password"
                  className="w-full bg-gray-100 bg-opacity-40 mt-1 rounded border border-gray-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>

              <div className="relative sm:col-span-4 mt-3">
                <label
                  htmlFor="confirmPassword"
                  className="leading-7 text-[17px] sm:text-lg md:text-[17px] lg:text-[17px] font-semibold text-gray-800"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="reenter_password"
                  name="reenter_password"
                  value={updatePasswordUser.reenter_password}
                  onChange={onChangePasswordUser}
                  placeholder="Confirm your New Password"
                  className="w-full bg-gray-100 bg-opacity-40 mt-1 rounded border border-gray-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>

              <div className="w-full mt-8">
                <button
                  type="submit"
                  className="w-52 text-center text-white text-lg bg-violet-600 lg:text-xl md:text-lg md:py-2 font-semibold border-0 py-3 lg:py-3 hover:bg-violet-700 transition-all duration-300 ease-in-out focus:outline-none hover:shadow-lg rounded"
                >
                  Update Password
                </button>
              </div>
            </form>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default CustomerAccountInfo;

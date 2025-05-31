import { useState } from "react";
import { DatePicker, InputNumber } from "antd";
import Charts from "./Charts";
import Accordion from "@/components/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { getMostTrendingTopics } from "@/features/TopicsSlice";
import {
  getChannelWiseTrendingTopics,
  getChannels,
} from "@/features/TopicsSlice";
import { ToastContainer, toast } from "react-toastify";

const TrendingTopics = () => {
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    limit: 3,
  });
  const dispatch = useDispatch();

  const { loggedInUser } = useSelector((state) => state.users);

  // Fetch the trending topics from Redux state
  const { trendingTopics } = useSelector((state) => state.trendingTopics);

  const handleDateChange = (date, dateString, field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: dateString, // Update the respective field with the date string
    }));
  };

  const handleNumberChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      limit: value, // Update the limit field
    }));
  };

  const handleGenerateTrends = (e) => {
    e.preventDefault();
    console.log("Form Data: ", formData);

    // Dispatch the action to fetch trending topics

    // console.log("This is after dispatch: " , dispatch(getMostTrendingTopics(formData)))
    // dispatch(getMostTrendingTopics(formData))
    //   .then((result) => {
    //     console.log("Payload (topics):", result.payload);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching topics:", error);
    //   });

    if (loggedInUser) {
      dispatch(getMostTrendingTopics(formData));
      dispatch(getChannelWiseTrendingTopics(formData));
      dispatch(getChannels());
      toast.success("Trends has been generated successfully!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // alert("You have to logged in into the system");
      toast.error("You have to logged in into the system", {
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

  return (
    <>
      <ToastContainer
        position="bottom-left"
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
      <section className="md:mx-[3%] lg:mx-[4%] xl:mx-[2%] p-6 bg-white shadow-lg rounded-lg shadow-violet-300">
        <h1 className="text-2xl sm:text-3xl font-bold text-violet-600 my-4 text-center">
          Explore Trends
        </h1>
        <form
          onSubmit={handleGenerateTrends}
          className="mx-[5%] sm:mx-[12%] md:mx-[14%] lg:mx-[18%] xl:mx-[25%]"
        >
          <p className="-mx-[5%] sm:-mx-[5%] md:-mx-0 text-md text-gray-600 mb-6 text-center">
            Select a date range and the number of trends you want to explore.
            Click &apos;Generate&apos; to discover the latest trends
            effortlessly!
          </p>
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <p className="mt-1 text-left text-base md:text-md lg:text-[16px] font-semibold text-gray-800">
              Start Date
            </p>
            <DatePicker
              onChange={(date, dateString) =>
                handleDateChange(date, dateString, "start_date")
              }
              required
              className="mt-1 w-full md:w-[75%] lg:w-[80%] cursor-pointer text-gray-600 rounded border border-gray-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <p className="mt-1 text-left text-base md:text-md lg:text-[16px] font-semibold text-gray-800">
              End Date
            </p>
            <DatePicker
              onChange={(date, dateString) =>
                handleDateChange(date, dateString, "end_date")
              }
              required
              className="mt-1 w-full md:w-[75%] lg:w-[80%] cursor-pointer text-gray-600 rounded border border-gray-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <p className="mt-1 text-left text-base md:text-md lg:text-[16px] font-semibold text-gray-800">
              No. of Trends
            </p>
            <InputNumber
              min={1}
              max={10}
              defaultValue={3}
              onChange={handleNumberChange}
              required
              className="mt-1 w-full md:w-[75%] lg:w-[80%] cursor-pointer text-gray-600 rounded border border-gray-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            // onClick={handleGenerateTrends}
            type="submit"
            className="my-4 w-full text-center text-white text-base lg:text-lg bg-violet-600 font-semibold border-0 py-3 hover:bg-violet-700 transition-all duration-300 ease-in-out focus:outline-none hover:shadow-lg rounded"
          >
            Generate Trends
          </button>
        </form>
        <hr className="mx-[6%] sm:mx-[8%] md:mx-[10%] lg:mx-[15%] xl:mx-[18%] my-12 border border-gray-200" />
        <section className="mx-[6%] sm:mx-[8%] md:mx-[10%] lg:mx-[15%] xl:mx-[18%]">
          {trendingTopics.length != 0 && <Accordion />}
        </section>
        <section className="mt-12 p-6 text-center">
          {trendingTopics.length != 0 && <Charts formData={formData} />}
        </section>
      </section>
    </>
  );
};

export default TrendingTopics;

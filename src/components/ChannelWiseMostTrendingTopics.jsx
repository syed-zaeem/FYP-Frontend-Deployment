import ChannelWiseMostTrendingTopicsChart from "@/pages/ChannelWiseMostTrendingTopicsChart";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChannelSpecificMostTredingTopics } from "@/features/TopicsSlice";

const ChannelWiseMostTrendingTopics = ({ formData }) => {
  const [selectedChannelIndex, setSelectedChannelIndex] = useState(null);
  const [selectedChannelName, setSelectedChannelName] = useState("");

  const { channels, loading, error } = useSelector(
    (state) => state.trendingTopics
  );
  const dispatch = useDispatch();

  const handleChannelSelection = (e, index) => {
    setSelectedChannelIndex(index);
    setSelectedChannelName(e.target.value);

    dispatch(
      getChannelSpecificMostTredingTopics({
        start_date: formData.start_date,
        end_date: formData.end_date,
        limit: formData.limit,
        channel_name: e.target.value,
      })
    );

    console.log("The complete details for passing into body are:", {
      start_date: formData.start_date,
      end_date: formData.end_date,
      limit: formData.limit,
      channel_name: e.target.value,
    });
  };

  return (
    <section className="mx-0 sm:mx-[8%] md:mx-[10%] lg:mx-[10%] xl:mx-[13%]">
      <h1 className="text-xl sm:text-2xl md:text-[22px] lg:text-2xl text-center font-semibold text-gray-800 mb-8">
        Select any Channel
      </h1>
      {/* {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500 font-medium">Error: {error}</p>} */}
      {/* Radio Buttons for Entities */}
      {/* <div className="flex justify-start flex-wrap md:mx-[5%] lg:mx-[8%] mb-10">
        {channels.map((channel, channelIndex) => (
          <label
            key={channelIndex}
            className="flex w-[50%] sm:w-[33%] md:w-[25%] my-1 items-center gap-3 cursor-pointer text-gray-800 text-[17px] font-urdunormal hover:text-violet-600 transition duration-300"
          >
            <span
              className={`relative w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-300 ${
                selectedChannelIndex === channelIndex
                  ? "border-violet-600 bg-violet-100"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="entity"
                value={channel.channel_name}
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleChannelSelection(e, channelIndex)}
                checked={selectedChannelIndex === channelIndex}
              />
              <span
                className={`block w-3 h-3 rounded-full transition-transform transform scale-0 bg-violet-600 ${
                  selectedChannelIndex === channelIndex ? "scale-100" : ""
                }`}
              ></span>
            </span>
            {channel.channel_name || `Entity ${channelIndex + 1}`}
          </label>
        ))}
      </div> */}

      <div className="flex justify-between flex-wrap mx-[5%] md:mx-[5%] lg:mx-[8%] mb-10">
        {channels.map((channel, channelIndex) => (
          <label
            key={channelIndex}
            className="flex w-[100%] sm:w-[50%] md:w-[33%] my-1 items-center gap-3 cursor-pointer text-gray-800 text-[17px] hover:text-violet-600 transition duration-300"
          >
            {/* Custom Radio Button */}
            <span
              className={`relative w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-300 ${
                selectedChannelIndex === channelIndex
                  ? "border-violet-600 bg-violet-100"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="entity"
                value={channel.channel_name}
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleChannelSelection(e, channelIndex)}
                checked={selectedChannelIndex === channelIndex}
              />
              <span
                className={`block w-3 h-3 rounded-full transition-transform transform scale-0 bg-violet-600 ${
                  selectedChannelIndex === channelIndex ? "scale-100" : ""
                }`}
              ></span>
            </span>

            {/* Channel Icon and Name */}
            <div className="flex items-center flex-row-reverse justify-between gap-2">
              {channel.channel_icon && (
                <img
                  src={channel.channel_icon}
                  alt={channel.channel_name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              )}
              <span>
                {channel.channel_name || `Entity ${channelIndex + 1}`}
              </span>
            </div>
          </label>
        ))}
      </div>

      {selectedChannelName != "" ? <ChannelWiseMostTrendingTopicsChart />  : <h3 className="text-lg">No channel is selected</h3>}
    </section>
  );
};

export default ChannelWiseMostTrendingTopics;

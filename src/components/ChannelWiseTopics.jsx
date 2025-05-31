// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getChannelWiseTrendingTopics } from "@/features/TopicsSlice";

// const ChannelWiseTopics = () => {
//   const [selectedTopic, setSelectedTopic] = useState("");

//   const { channelWiseTrendingTopics, loading, error } = useSelector(
//     (state) => state.trendingTopics
//   );

//   // const dispatch = useDispatch();

//   useEffect(() => {
//     // dispatch(getChannelWiseTrendingTopics());
//   }, []);

//   // Helper function to remove numbering
//   const removeNumbering = (text) => {
//     return text.replace(/^\d+\.\s*/, ""); // Removes only the leading number with a dot and space
//   };

//   const handleTopicChange = (event) => {
//     setSelectedTopic(event.target.value);
//     console.log("The selected topic is: ", event.target.value);
//   };

//   return (
//     <section className="mx-0 sm:mx-[8%] md:mx-[10%] lg:mx-[10%] xl:mx-[13%]">
//       <h1 className="text-xl sm:text-2xl md:text-[22px] lg:text-2xl text-center font-semibold text-gray-800 mb-8">
//         Select any Trend
//       </h1>
//       {/* Radio Buttons */}
//       <div
//         className="flex justify-between flex-wrap md:mx-[5%] lg:mx-[8%]"
//         dir="rtl"
//       >
//         {channelWiseTrendingTopics.map((item, index) => (
//           <label
//             key={index}
//             className="flex w-[50%] sm:w-[33%] md:w-[25%] my-1 items-center gap-3 cursor-pointer text-gray-800 text-[17px] font-urdunormal hover:text-violet-600 transition duration-300"
//           >
//             <span
//               className={`relative w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-300 ${
//                 selectedTopic === item.entity
//                   ? "border-violet-600 bg-violet-100"
//                   : ""
//               }`}
//             >
//               <input
//                 type="radio"
//                 name="topic"
//                 value={item.entity}
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//                 onChange={handleTopicChange}
//                 checked={selectedTopic === item.entity}
//               />
//               <span
//                 className={`block w-3 h-3 rounded-full transition-transform transform scale-0 bg-violet-600 ${
//                   selectedTopic === item.entity ? "scale-100" : ""
//                 }`}
//               ></span>
//             </span>
//             {item.entity}
//           </label>
//         ))}
//       </div>

//       {loading && <p className="text-blue-500">Loading...</p>}
//       {error && <p className="text-red-500 font-medium">Error: {error}</p>}

//       {selectedTopic ? (
//         channelWiseTrendingTopics
//           .filter((entityData) => entityData.entity === selectedTopic)
//           .map((entityData, entityIndex) => (
//             <div
//               key={entityIndex}
//               className="mb-8 p-4 border border-gray-200 rounded-lg shadow-lg shadow-gray-400 my-5 bg-white"
//             >
//               {/* Channels Section */}
//               {entityData.channels.map((channel, channelIndex) => (
//                 <div key={channelIndex} className="mb-6">
//                   <div className="w-40 mx-auto flex items-center justify-center mb-3">
//                     <img
//                       src={channel.channel_icon}
//                       alt={`${channel.channel_name} Icon`}
//                       className="w-10 h-10 rounded-full object-cover mr-3"
//                     />
//                     <h4 className="text-lg md:text-xl font-semibold md:font-bold text-violet-600">
//                       {channel.channel_name}
//                     </h4>
//                   </div>

//                   {/* Videos Section */}
//                   <div className="pl-0">
//                     {channel.videos.map((video, videoIndex) => (
//                       <div
//                         key={videoIndex}
//                         className="mb-4 p-3 border border-gray-300 rounded-md bg-gray-50"
//                       >
//                         <ul className="list-disc text-right pl-6 space-y-3 my-2">
//                           {video.details.map((detail, detailIndex) => (
//                             <li
//                               key={detailIndex}
//                               className="text-gray-600 text-sm sm:text-[16px] md:text-lg list-none text-md font-urdunormal"
//                             >
//                               {removeNumbering(detail.topic_content)}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))
//       ) : (
//         <h3 className="text-lg">No trend is selected</h3>
//       )}
//     </section>
//   );
// };

// export default ChannelWiseTopics;

import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa"; // Import icon
import { useSelector } from "react-redux";

const EntityChannelAccordion = () => {
  const [selectedEntityIndex, setSelectedEntityIndex] = useState(null);
  const [expandedChannelIndex, setExpandedChannelIndex] = useState(null);

  const { channelWiseTrendingTopics, loading, error } = useSelector(
    (state) => state.trendingTopics
  );

  // Helper function to remove numbering
  const removeNumbering = (text) => {
    return text.replace(/^\d+\.\s*/, ""); // Removes only the leading number with a dot and space
  };

  const handleEntitySelection = (index) => {
    setSelectedEntityIndex(index);
    setExpandedChannelIndex(null); // Reset channel selection when switching entities
  };

  const toggleChannelAccordion = (index) => {
    setExpandedChannelIndex(expandedChannelIndex === index ? null : index);
  };

  return (
    <section className="mx-0 sm:mx-[8%] md:mx-[10%] lg:mx-[10%] xl:mx-[13%]">
      <h1 className="text-xl sm:text-2xl md:text-[22px] lg:text-2xl text-center font-semibold text-gray-800 mb-8">
        Select any Trend
      </h1>
      {/* {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500 font-medium">Error: {error}</p>} */}

      {/* Radio Buttons for Entities */}
      <div
        className="flex justify-between flex-wrap md:mx-[5%] lg:mx-[8%] mb-10"
        dir="rtl"
      >
        {channelWiseTrendingTopics.map((entity, entityIndex) => (
          <label
            key={entityIndex}
            className="flex w-[40%] sm:w-[33%] md:w-[25%] my-1 items-center gap-3 cursor-pointer text-gray-800 text-[17px] font-urdunormal hover:text-violet-600 transition duration-300"
          >
            <span
              className={`relative w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-300 ${
                selectedEntityIndex === entityIndex
                  ? "border-violet-600 bg-violet-100"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="entity"
                value={entity.entity}
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={() => handleEntitySelection(entityIndex)}
                checked={selectedEntityIndex === entityIndex}
              />
              <span
                className={`block w-3 h-3 rounded-full transition-transform transform scale-0 bg-violet-600 ${
                  selectedEntityIndex === entityIndex ? "scale-100" : ""
                }`}
              ></span>
            </span>
            {entity.entity || `Entity ${entityIndex + 1}`}
          </label>
        ))}
      </div>

      {/* Radio Buttons */}
      {/* <div
        className="flex justify-between flex-wrap md:mx-[5%] lg:mx-[8%]"
        dir="rtl"
      >
        {channelWiseTrendingTopics.map((item, index) => (
          <label
            key={index}
            className="flex w-[50%] sm:w-[33%] md:w-[25%] my-1 items-center gap-3 cursor-pointer text-gray-800 text-[17px] font-urdunormal hover:text-violet-600 transition duration-300"
          >
            <span
              className={`relative w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-300 ${
                selectedTopic === item.entity
                  ? "border-violet-600 bg-violet-100"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="topic"
                value={item.entity}
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleTopicChange}
                checked={selectedTopic === item.entity}
              />
              <span
                className={`block w-3 h-3 rounded-full transition-transform transform scale-0 bg-violet-600 ${
                  selectedTopic === item.entity ? "scale-100" : ""
                }`}
              ></span>
            </span>
            {item.entity}
          </label>
        ))}
      </div> */}

      {/* Channels for Selected Entity */}
      {selectedEntityIndex !== null ? (
        <div>
          {channelWiseTrendingTopics[selectedEntityIndex].channels.map(
            (channel, channelIndex) => (
              <div
                key={channelIndex}
                className={`channel-accordion border border-gray-200 rounded-lg p-3 mb-4 ${
                  expandedChannelIndex === channelIndex
                    ? "bg-indigo-100 border-indigo-500"
                    : "bg-white"
                }`}
              >
                {/* Channel Accordion Header */}
                <button
                  className="flex justify-between items-center w-full"
                  onClick={() => toggleChannelAccordion(channelIndex)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={channel.channel_icon}
                      alt={channel.channel_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <h4 className="font-medium text-violet-600 text-lg">
                      {channel.channel_name}
                    </h4>
                  </div>
                  <svg
                    className={`w-5 h-5 transition-transform transform ${
                      expandedChannelIndex === channelIndex ? "rotate-90" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12H18M12 18V6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>

                {/* Channel Accordion Content */}
                {expandedChannelIndex === channelIndex && (
                  <div className="mt-3 space-y-3">
                    {channel.videos.map((video, videoIndex) => (
                      <div
                        key={videoIndex}
                        className="p-3 border border-gray-300 rounded-md bg-gray-50"
                      >
                        <ul className="list-disc text-right pl-6 space-y-3 my-2">
                          <div>
                            <div className="flex justify-end">
                              <a
                                href={video.details[0].video_link} // Assuming you have video.link in your data
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-urdunormal pb-4 text-blue-600 text-sm sm:text-base md:text-lg underline hover:text-blue-800 transition"
                              >
                                ویڈیو لنک دیکھیں
                              </a>
                            </div>
                            {video.details.map((detail, detailIndex) => (
                              <li
                                key={detailIndex}
                                className="text-gray-600 text-sm sm:text-[16px] md:text-lg list-none text-md font-urdunormal"
                              >
                                {removeNumbering(detail.topic_content)}
                              </li>
                            ))}
                          </div>
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      ) : (
        <h3 className="text-lg">No trend is selected</h3>
      )}
    </section>
  );
};

export default EntityChannelAccordion;

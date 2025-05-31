import { useState } from "react";
import {
  FaFileUpload,
  FaTrash,
} from "react-icons/fa";
import { InputNumber } from "antd";
import Accordion from "./Accordion";
import Charts from "@/pages/Charts";

const CustomTopics = () => {
  const [driveLink, setDriveLink] = useState("");
  const [file, setFile] = useState(null);
  const [expandedTopicIndex, setExpandedTopicIndex] = useState(null);
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    limit: 0
  })

  const [videos, setVideos] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newVideos = files.filter(
      (file) =>
        !videos.some(
          (video) => video.name === file.name && video.size === file.size
        )
    );

    if (newVideos.length < files.length) {
      alert("Some videos were already uploaded and have been skipped.");
    }

    setVideos((prevVideos) => [...prevVideos, ...newVideos]);
  };

  const handleDelete = (index) => {
    setVideos((prevVideos) => prevVideos.filter((_, i) => i !== index));
  };

  const accordionData = [
    {
      title: "پاکستان",
      content: [
        "پاکستان میں سیاسی جماعتوں کے مسائل",
        " پاکستان کے نظام میں گول گول گھومنا",
        "پاکستان کی سیاسی نظام میں تبدیلی کی ضرورت",
        "پاکستان اور عرب ممالک کے تعلقات",
        "پاکستان کے موجودہ حالات اور معاملات",
      ],
    },
    {
      title: "حکومت",
      content: [
        "حکومت کے مالیاتی پوزیشن اور بجٹ خسارہ",
        "تحریک انصاف کی حکومت کی پالیسیاں",
        "حکومت کی نا انصافی اور ظلم",
      ],
    },
    {
      title: "عدلیہ",
      content: [
        "پاکستان کی عدلیہ کے انصاف کا معیار",
        "عدلیہ کی ریفارم کی ضرورت",
        " عدلیہ کی خودمختاری",
        " مداخلت کے الزامات اور عدلیہ کی آزادی",
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Handle file upload
  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  // Handle topic generation (Mock functionality)
  // const generateTopics = () => {
  //   alert("Generating topics... This is a placeholder action.");
  // };

  // Toggle accordion
  const toggleAccordion = (index) => {
    setExpandedTopicIndex(expandedTopicIndex === index ? null : index);
  };

  const onChangeNumber = (value) => {
    // console.log('changed', value);
  };

  return (
    <section className="md:mx-[3%] lg:mx-[4%] xl:mx-[2%] p-6 bg-white shadow-lg rounded-lg shadow-violet-300">
      <div className="mx-0 sm:mx-[2%] md:mx-[8%] lg:mx-[15%] xl:mx-[18%] mb-10 px-6 bg-white">
        <h1 className="text-2xl sm:text-3xl font-bold text-violet-600 my-4 text-center">
          Custom Topics
        </h1>
        <p className="text-md text-gray-600 mb-6 text-center">
          Upload your video and select the number of topics you want to
          generate. Click 'Generate' to get your trending topics in seconds!
        </p>

        {/* Input for Drive Link */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter drive link of video"
            value={driveLink}
            onChange={(e) => setDriveLink(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <section className="mb-4 border rounded p-[3%] sm:p-[5%]">
          <div className="border-dashed border-2 border-gray-300 rounded-md p-6 flex flex-col items-center hover:bg-gray-50 transition duration-300 ease-in-out">
            <input
              type="file"
              accept="video/*"
              className="hidden"
              id="file-upload"
              multiple
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center text-center text-violet-600 hover:text-violet-800"
            >
              <FaFileUpload size={40} className="mb-2 text-gray-500" />
              <span className="text-gray-700">
                {videos.length > 0
                  ? `You have uploaded ${videos.length} video(s)`
                  : "Press or drag videos to upload"}
              </span>
            </label>
          </div>

          {/* Uploaded Videos List */}
          {videos.length > 0 && (
            <div className="mt-4 space-y-4">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border border-gray-200 rounded p-2"
                >
                  <span className="text-gray-700">{video.name}</span>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="flex justify-between mt-10 mb-12 flex-col sm:flex-row mx-[10%] sm:mx-[10%] lg:mx-[5%]">
          <p
            htmlFor="startDate"
            className="text-left text-[16px] md:text-[17px] mb-1 mt-1 font-semibold text-gray-800"
          >
            No. of Topics
          </p>
          <InputNumber
            min={1}
            max={10}
            defaultValue={3}
            onChange={onChangeNumber}
            className="w-full sm:w-[75%] md:w-[70%] lg:w-[75%] cursor-pointer text-gray-600 rounded border border-gray-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none px-3 leading-8 transition-colors duration-200 ease-in-out"
            style={{ fontSize: "15px" }}
          />
        </div>

        {/* Generate Topic Button */}
        <div className="w-full mt-10">
          <button className="w-full text-center text-white text-lg bg-violet-600 lg:text-xl md:text-lg md:py-2 font-semibold border-0 py-3 lg:py-3 hover:bg-violet-700 transition-all duration-300 ease-in-out focus:outline-none hover:shadow-lg rounded">
            Generate Topics
          </button>
        </div>

        <hr className="my-12 border border-gray-200" />
        <h1 className="text-left text-xl sm:text-[26px] md:text-[24px] lg:text-[26px] font-semibold text-gray-800 mb-8">
            Explore Generated Topics
          </h1>
        {/* Generated Topics Section with Accordion */}
        <Accordion />
      </div>
        <section className="mt-12 p-6 text-center">
          <h3 className="text-xl mb-4 sm:text-2xl md:text-[26px] font-bold text-violet-700">
            Explore Topic Trends
          </h3>
          <Charts />
        </section>
    </section>
  );
};

export default CustomTopics;

// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { InputNumber } from "antd";
// import { FaFileUpload, FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";

// const CustomTopics = () => {
//   const [driveLink, setDriveLink] = useState("");
//   const [videos, setVideos] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(null);

//   const accordionData = [
//     {
//       title: "پاکستان",
//       content: [
//         "پاکستان میں سیاسی جماعتوں کے مسائل",
//         "پاکستان کے نظام میں گول گول گھومنا",
//         "پاکستان کی سیاسی نظام میں تبدیلی کی ضرورت",
//         "پاکستان اور عرب ممالک کے تعلقات",
//         "پاکستان کے موجودہ حالات اور معاملات",
//       ],
//     },
//     {
//       title: "حکومت",
//       content: [
//         "حکومت کے مالیاتی پوزیشن اور بجٹ خسارہ",
//         "تحریک انصاف کی حکومت کی پالیسیاں",
//         "حکومت کی نا انصافی اور ظلم",
//       ],
//     },
//     {
//       title: "عدلیہ",
//       content: [
//         "پاکستان کی عدلیہ کے انصاف کا معیار",
//         "عدلیہ کی ریفارم کی ضرورت",
//         "عدلیہ کی خودمختاری",
//         "مداخلت کے الزامات اور عدلیہ کی آزادی",
//       ],
//     },
//   ];

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newVideos = files.filter(
//       (file) =>
//         !videos.some(
//           (video) => video.name === file.name && video.size === file.size
//         )
//     );

//     if (newVideos.length < files.length) {
//       alert("Some videos were already uploaded and have been skipped.");
//     }

//     setVideos((prevVideos) => [...prevVideos, ...newVideos]);
//   };

//   const handleDelete = (index) => {
//     setVideos((prevVideos) => prevVideos.filter((_, i) => i !== index));
//   };

//   const handleToggle = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   const onChangeNumber = (value) => {
//     // Handle number change
//   };

//   return (
//     <>
//       <section className="container mx-auto p-6 bg-white shadow-lg rounded-lg shadow-violet-300">
//         <h1 className="text-2xl sm:text-3xl font-bold text-violet-600 mt-4 mb-8 text-center">
//           Custom Topics
//         </h1>
//         <p className="text-md text-gray-600 mb-6 text-center">
//           Upload your videos and select the number of topics you want to generate.
//           Click 'Generate' to get your trending topics in seconds!
//         </p>

//         {/* Drive Link Input */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Enter drive link of video"
//             value={driveLink}
//             onChange={(e) => setDriveLink(e.target.value)}
//             className="w-full p-3 border rounded-md focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-indigo-200"
//           />
//         </div>

//         {/* File Upload Section */}
//         <section className="mb-4 border rounded p-[3%] sm:p-[5%]">
//           <div className="border-dashed border-2 border-gray-300 rounded-md p-6 flex flex-col items-center hover:bg-gray-50 transition duration-300 ease-in-out">
//             <input
//               type="file"
//               accept="video/*"
//               className="hidden"
//               id="file-upload"
//               multiple
//               onChange={handleFileChange}
//             />
//             <label
//               htmlFor="file-upload"
//               className="cursor-pointer flex flex-col items-center text-center text-violet-600 hover:text-violet-800"
//             >
//               <FaFileUpload size={40} className="mb-2 text-gray-500" />
//               <span className="text-gray-700">
//                 {videos.length > 0
//                   ? `You have uploaded ${videos.length} video(s)`
//                   : "Press or drag videos to upload"}
//               </span>
//             </label>
//           </div>

//           {/* Uploaded Videos List */}
//           {videos.length > 0 && (
//             <div className="mt-4 space-y-4">
//               {videos.map((video, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between border border-gray-200 rounded p-2"
//                 >
//                   <span className="text-gray-700">{video.name}</span>
//                   <button
//                     onClick={() => handleDelete(index)}
//                     className="text-red-600 hover:text-red-800 transition"
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>

//         {/* Number of Topics Input */}
//         <div className="flex justify-between mt-10 mb-12 flex-col sm:flex-row">
//           <p className="text-left text-[16px] md:text-[17px] mb-1 mt-1 font-semibold text-gray-800">
//             No. of Topics
//           </p>
//           <InputNumber
//             min={1}
//             max={10}
//             defaultValue={3}
//             onChange={onChangeNumber}
//             className="w-full sm:w-[75%] md:w-[80%] cursor-pointer text-gray-600 rounded border border-gray-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none px-3 leading-8 transition-colors duration-200 ease-in-out"
//             style={{ fontSize: "15px" }}
//           />
//         </div>

//         {/* Generate Topics Button */}
//         <button className="w-full text-center text-white text-lg bg-violet-600 lg:text-xl md:text-lg md:py-2 font-semibold border-0 py-3 lg:py-3 hover:bg-violet-700 transition-all duration-300 ease-in-out focus:outline-none hover:shadow-lg rounded">
//           Generate Topics
//         </button>

//         <hr className="my-12 border border-gray-200" />

//         {/* Generated Topics Section */}
//         <section>
//           <h1 className="text-left text-xl sm:text-[26px] md:text-[24px] lg:text-[26px] font-semibold text-gray-800 mb-8">
//             Generated Topics
//           </h1>
//           <div className="w-full px-0 sm:px-2 md:px-5 bg-white">
//             {accordionData.map((item, index) => (
//               <div key={index} className="border-b border-violet-400">
//                 <button
//                   className={`w-full text-gray-800 font-bold flex justify-between items-center p-3 sm:p-3 md:p-4 transition-colors duration-500 ${
//                     activeIndex === index
//                       ? "bg-violet-600 text-white"
//                       : "bg-white text-gray-800"
//                   }`}
//                   onClick={() => handleToggle(index)}
//                 >
//                   <span className="text-[17px] sm:text-lg md:text-xl">
//                     {item.title}
//                   </span>
//                   <span
//                     className={`transform transition-transform ${
//                       activeIndex === index ? "rotate-180" : "rotate-0"
//                     }`}
//                   >
//                     <FaChevronDown size={18} />
//                   </span>
//                 </button>
//                 <div
//                   className={`transition-all duration-500 ease-in-out overflow-hidden ${
//                     activeIndex === index
//                       ? "max-h-screen opacity-100"
//                       : "max-h-0 opacity-0"
//                   }`}
//                 >
//                   <div className="px-4 pb-4 pt-3">
//                     <ul>
//                       {item.content.map((word, wordIndex) => (
//                         <li
//                           key={wordIndex}
//                           className="text-gray-700 text-sm sm:text-[15px] md:text-[16px] font-semibold mb-2"
//                         >
//                           {word}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </section>
//     </>
//   );
// };

// export default CustomTopics;

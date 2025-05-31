import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa"; // Import icon
import { useSelector } from "react-redux";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // const [topics, setTopics] = useState();

  const { trendingTopics, loading, error } = useSelector(
    (state) => state.trendingTopics
  );

  // var parsedEntities = []

  // useEffect(() => {

  const parsedEntities = trendingTopics.map((entity) => {
    const updatedData = entity.data.map((entry) => {
      const topics = entry.contents
        .split(",") // Split by commas
        .map((topic) => topic.trim().replace(/^\d+\.\s*/, "")); // Clean numbering
      return {
        ...entry,
        topics, // Add parsed topics
      };
    });
    return {
      ...entity,
      data: updatedData, // Update the data array with parsed topics
    };
  });

  console.log("The trending topics accordion are:", trendingTopics);

  console.log("The parsed topics accordion are:", parsedEntities);
  // }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <h1 className="text-left text-xl sm:text-[26px] md:text-[24px] lg:text-[26px] font-semibold text-gray-800 mb-8">
        Explore Trend Insights
      </h1>
      <div className="accordion-group space-y-3" dir="rtl">
        {parsedEntities.map((entity, index) => (
          <div
            key={index}
            className={`accordion border border-solid border-gray-300 p-4 rounded-xl transition duration-500 ${
              activeIndex === index ? "bg-indigo-50 border-indigo-600" : ""
            }`}
          >
            <button
              className="accordion-toggle group inline-flex items-center justify-between w-full text-right text-base leading-8 text-gray-900 hover:text-indigo-600 transition duration-500"
              onClick={() => toggleAccordion(index)}
              aria-controls={`accordion-content-${index}`}
            >
              <h5 className="font-urdubold text-lg md:text-xl">
                {entity.entity}
              </h5>
              <svg
                className={`w-6 h-6 transition-transform transform ${
                  activeIndex === index ? "rotate-90" : ""
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
            <div
              id={`accordion-content-${index}`}
              className={`accordion-content overflow-hidden transition-all duration-500 ${
                activeIndex === index ? "pr-4" : "max-h-0"
              }`}
            >
              <ul className="font-urdunormal mt-3 text-gray-700 text-sm sm:text-base space-y-3">
                {entity.data.map((topic, topicIndex) => {
                    // console.log("The single topics are:", topic.topics.length);
                    return topic.topics.map((singleTopic, singleTopicIndex) => {
                      // console.log(
                      //   "The single topic for showing is:",
                      //   singleTopic
                      // );
                      return (
                        <li
                          key={singleTopicIndex}
                          className="flex items-center gap-3 p-3 rounded-md shadow-sm hover:bg-gray-200 transition"
                        >
                          <FaCheckCircle className="text-indigo-600 text-lg" />
                          <span className="leading-relaxed">{singleTopic}</span>
                        </li>
                      );
                    });
                  
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Accordion;

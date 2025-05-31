import { useState } from "react";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";
import VerticalUrduKanban from "@/components/VerticalUrduKanban";
import ChannelWiseTopics from "@/components/ChannelWiseTopics";
import ChannelWiseMostTrendingTopics from "@/components/ChannelWiseMostTrendingTopics";

const Charts = ({ formData }) => {
  const [analyticType, setAnalyticType] = useState("");

  const handleAnalytic = (e) => {
    setAnalyticType(e.target.value);
  };

  const data = {};

  return (
    <>
      <h3 className="text-xl mb-4 sm:text-2xl md:text-[26px] font-bold text-violet-700">
        Explore Topic Trends
      </h3>
      <section className="text-center">
        <section className="mb-12 mx-[6%] sm:mx-[8%] md:mx-[10%] lg:mx-[15%] xl:mx-[18%]">
          {/* <h1 className="text-left text-xl sm:text-2xl md:text-[22px] lg:text-2xl font-bold text-violet-600 my-4">
            Explore Detailed Insights on Trending Topics
          </h1> */}
          <p className="mb-4 text-left text-[14px] md:text-[15px] text-gray-600">
            Choose an analytic below to view how trends evolve, identify the
            most popular topics, or compare engagement patterns. Each
            visualization provides a comprehensive understanding of your
            selected trends over time.
          </p>

          <div className="relative">
            <select
              id="trendSelector"
              className="block w-full bg-white border rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none border-gray-300 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 cursor-pointer"
              onChange={(e) => handleAnalytic(e)}
            >
              <option value="" disabled selected>
                Select an analytic to begin...
              </option>
              <option value="TrendingOverTime">Trends Over Time</option>
              <option value="MostTrending">Highest Trends</option>
              <option value="MonthWiseTrendsInsights">Month Wise Trends Insights</option>
              <option value="ChannelWiseTrends">Channel Wise Trends</option>
              <option value="ChannelSpecificHighestTrends">Channel Specific Highest Trends</option>
            </select>
          </div>
        </section>

        {analyticType === "TrendingOverTime" && <Chart1 />}

        {analyticType === "MostTrending" && <Chart2 data={data} />}

        {analyticType === "MonthWiseTrendsInsights" && <VerticalUrduKanban />}

        {analyticType === "ChannelWiseTrends" && <ChannelWiseTopics />}

        {analyticType === "ChannelSpecificHighestTrends" && <ChannelWiseMostTrendingTopics formData={formData} />}

        <section className="min-h-92 lg:h-[450px] xl:min-h-[500px] flex items-center justify-center mt-12 -mx-10 sm:mx-0 md:mx-[5%] lg:mx-[12%]">
          {/* <UrduBarGraph entity="عدلیہ" data={resultsJson} /> */}
        </section>
      </section>
    </>
  );
};

export default Charts;

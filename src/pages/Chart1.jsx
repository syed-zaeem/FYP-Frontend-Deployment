import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

const Chart1 = () => {
  const [chartData, setChartData] = useState([]);

  const { trendingTopics } = useSelector((state) => state.trendingTopics);
  const [entityColors, setEntityColors] = useState([]);

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

  console.log("The trending entities are: ", trendingTopics);
  console.log("The parsed entities are: ", parsedEntities);

  useEffect(() => {
    const generateColorPalette = (numColors) => {
      const colors = [];
      for (let i = 0; i < numColors; i++) {
        const hue = (i * 360) / numColors; // Distribute colors evenly around the color wheel
        colors.push(`hsl(${hue}, 70%, 50%)`); // Adjust saturation and lightness as needed
      }
      return colors;
    };
    
    // const processChartData = () => {
    //   const allDates = new Set();
    //   const entityCountsByDate = {};

    //   // Collect all unique dates and initialize the data structure
    //   parsedEntities.forEach((entity) => {
    //     entity.data.forEach((entry) => {
    //       allDates.add(entry.specific_date);
    //       if (!entityCountsByDate[entry.specific_date]) {
    //         entityCountsByDate[entry.specific_date] = { specific_date: entry.specific_date };
    //       }
    //       entityCountsByDate[entry.specific_date][entity.entity] = 0; // Initialize entity count
    //     });
    //   });

    //   // Populate entity counts for each date
    //   parsedEntities.forEach((entity) => {
    //     entity.data.forEach((entry) => {
    //       entityCountsByDate[entry.specific_date][entity.entity] =
    //         (entityCountsByDate[entry.specific_date][entity.entity] || 0) +
    //         entry.entity_count;
    //     });
    //   });

    //   // Convert the object into an array sorted by date
    //   const chartDataArray = Object.values(entityCountsByDate).sort(
    //     (a, b) => new Date(a.specific_date) - new Date(b.specific_date)
    //   );

    //   setChartData(chartDataArray);

    //   // Generate dynamic colors based on the number of entities
    //   setEntityColors(generateColorPalette(parsedEntities.length));
    // };

    // processChartData();



    const processChartData = () => {

      const allDates = new Set();
      const entities = new Set();

      // Collect all unique dates and entities
      parsedEntities.forEach((entity) => {
        entities.add(entity.entity); // Collect entity names
        entity.data.forEach((entry) => {
          allDates.add(entry.specific_date);
        });
      });

      const sortedDates = Array.from(allDates).sort(); // Sort dates
      const chartDataArray = [];

      // Initialize an object for each date with default entity counts
      sortedDates.forEach((specific_date) => {
        const dateEntry = { specific_date };
        entities.forEach((entityName) => {
          dateEntry[entityName] = 0; // Default count is 0
        });
        chartDataArray.push(dateEntry);
      });

      // Populate entity counts for each date
      parsedEntities.forEach((entity) => {
        entity.data.forEach((entry) => {
          const chartEntry = chartDataArray.find((d) => d.specific_date === entry.specific_date);
          if (chartEntry) {
            chartEntry[entity.entity] = entry.entity_count;
          }
        });
      });

      setChartData(chartDataArray);

      // Generate dynamic colors based on the number of entities
      setEntityColors(generateColorPalette(entities.size));
    };

    processChartData();
  }, []);

  return (
    <section className="mr-[3%] -ml-7 sm:-ml-4 md:mx-0 lg:mx-0 xl:mx-0 overflow-x-auto">
      <div style={{ minWidth: "800px" }}>
        {" "}
        {/* Ensures horizontal scroll for small screens */}
        <ResponsiveContainer width="100%" height={480}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis
              dataKey="specific_date"
              tick={{ fontSize: 12, fontFamily: "Arial, sans-serif" }}
            />
            <YAxis tick={{ fontSize: 12, fontFamily: "Arial, sans-serif" }} />
            <Tooltip
              wrapperStyle={{
                fontFamily: '"Noto Nastaliq Urdu Medium", sans-serif', // Set font for legend
                fontSize: 14,
              }}
            />
            <Legend
              wrapperStyle={{
                fontFamily: '"Noto Nastaliq Urdu Medium", sans-serif', // Set font for legend
                fontSize: 14,
              }}
            />
            {parsedEntities.map((topic, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={topic.entity}
                // stroke={
                //   index === 0 ? "#8884d8" : index === 1 ? "#82ca9d" : "#ff7300"
                // }
                stroke={entityColors[index % entityColors.length]} // Cycle colors if there are more entities than colors
                strokeWidth={1.5}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default Chart1;

// import { useState, useEffect } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { useSelector } from "react-redux";

// const Chart1 = () => {
//   const [chartData, setChartData] = useState([]);
//   const { trendingTopics } = useSelector((state)=>state.trendingTopics)

//   const parsedEntities = trendingTopics.map((entity) => {
//     const updatedData = entity.data.map((entry) => {
//       const topics = entry.contents
//         .split(",") // Split by commas
//         .map((topic) => topic.trim().replace(/^\d+\.\s*/, "")); // Clean numbering
//       return {
//         ...entry,
//         topics, // Add parsed topics
//       };
//     });
//     return {
//       ...entity,
//       data: updatedData, // Update the data array with parsed topics
//     };
//   });

//   console.log("The parsed entities are: , parsedEntities")

//   useEffect(() => {
//     // Transform the data to fit the chart's needs
//     const processChartData = () => {
//       const topKeywords = trendingTopics[0]?.data
//         .flatMap((item) => item.topics)
//         .slice(0, 3); // Limit to the top 3 topics
//       const keywordDateDocCounts = {};
//       const allDates = new Set();

//       // Initialize an empty object for each keyword
//       topKeywords.forEach((keyword, index) => {
//         keywordDateDocCounts[`topic_${index + 1}`] = {};
//       });

//       // Process the dataset to aggregate counts per date
//       dataset[0]?.data.forEach((item) => {
//         const date = item.specific_date;
//         allDates.add(date);

//         item.topics.forEach((_, index) => {
//           if (index < 3) {
//             const key = `topic_${index + 1}`;
//             if (!keywordDateDocCounts[key][date]) {
//               keywordDateDocCounts[key][date] = 0;
//             }
//             keywordDateDocCounts[key][date] += item.entity_count; // Aggregate counts
//           }
//         });
//       });

//       // Prepare chart data for Recharts
//       const sortedDates = Array.from(allDates).sort();
//       const chartData = sortedDates.map((date) => {
//         const obj = { date };
//         topKeywords.forEach((_, index) => {
//           const key = `topic_${index + 1}`;
//           obj[key] = keywordDateDocCounts[key][date] || 0;
//         });
//         return obj;
//       });

//       setChartData(chartData);
//     };

//     processChartData();
//   }, [dataset]);

//   return (
//     <section className="mr-[3%] -ml-7 sm:-ml-4 md:mx-0 lg:mx-0 xl:mx-0 overflow-x-auto">
//       <div style={{ minWidth: "800px" }}>
//         {/* Ensures horizontal scroll for small screens */}
//         <ResponsiveContainer width="100%" height={480}>
//           <LineChart data={chartData}>
//             <CartesianGrid stroke="#ccc" />
//             <XAxis
//               dataKey="date"
//               tick={{ fontSize: 12, fontFamily: "Arial, sans-serif" }}
//             />
//             <YAxis tick={{ fontSize: 12, fontFamily: "Arial, sans-serif" }} />
//             <Tooltip
//               wrapperStyle={{
//                 fontFamily: '"Noto Nastaliq Urdu Medium", sans-serif',
//                 fontSize: 14,
//               }}
//             />
//             <Legend
//               wrapperStyle={{
//                 fontFamily: '"Noto Nastaliq Urdu Medium", sans-serif',
//                 fontSize: 14,
//               }}
//             />
//             {Array(3)
//               .fill(null)
//               .map((_, index) => (
//                 <Line
//                   key={index}
//                   type="monotone"
//                   dataKey={`topic_${index + 1}`}
//                   stroke={
//                     index === 0 ? "#8884d8" : index === 1 ? "#82ca9d" : "#ff7300"
//                   }
//                   strokeWidth={1.5}
//                 />
//               ))}
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </section>
//   );
// };

// export default Chart1;

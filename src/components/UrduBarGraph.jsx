import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Registering Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const UrduBarGraph = ({ entity, data }) => {
  // Extract data for the given entity
  const entityData = data.merged_topics.find((item) => item.keyword === entity);

  if (!entityData) {
    return <div>No data available for the entity "{entity}".</div>;
  }

  // Sort topics by publish_date
  const sortedTopics = entityData.topics.sort(
    (a, b) => new Date(a.publish_date) - new Date(b.publish_date)
  );

  // Prepare data for graph
  const labels = sortedTopics.map((topic) => topic.publish_date);

  // Calculate the actual count of subtopics for each publish_date
  const topicCounts = sortedTopics.map((topic) => topic.topics.length);

  // Flatten all subtopics for tooltips
  const topicsInfo = sortedTopics.map((topic) =>
    topic.topics.flatMap((subtopic) => {
      const key = Object.keys(subtopic)[0];
      return `• ${subtopic[key].topic}`;
    })
  );

  // Prepare data for Chart.js
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Trends Insights",
        data: topicCounts,
        backgroundColor: "rgba(136, 132, 216, 0.8)",
        borderColor: "#8884d8",
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  // const width = window.innerWidth;

  // let fontSize = 14;
  // let legendPosition = "top";

  // if (width < 500) {
  //   fontSize = 12;
  //   legendPosition = "bottom";
  // } else if (width < 768) {
  //   fontSize = 12;
  //   legendPosition = "right";
  // } 
  // else if (width < 1024) {
  //   fontSize = 14;
  //   legendPosition = "right";
  // }


  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,  // Disable aspect ratio to allow custom height
    plugins: {
      tooltip: {
        callbacks: {
          afterLabel: (tooltipItem) => {
            const index = tooltipItem.dataIndex;
            return `\n${topicsInfo[index].join("\n\n")}`;
          },
        },
        bodyFont: {
          family: '"Noto Nastaliq Urdu Medium", sans-serif', // Tooltip font family
          size: 12, // Tooltip font size
        },
        titleFont: {
          family: '"Arial", sans-serif', // Tooltip title font family
          size: 12, // Tooltip title font size
        },
        // bodyAlign: "right", // Align the body text to the right (for RTL)
        titleAlign: "left", // Align the title text to the right (for RTL)
      },
      legend: {
        position: "top",
        labels: {
          font: {
            family: '"Roboto", sans-serif', // Legend font family
            size: 14, // Legend font size
          },
          color: "#000", // Legend text color
        },
      },
      title: {
        display: true,
        text: `Graph for ${entity}`,
        font: {
          family: '"Roboto", sans-serif', // Title font family
          size: 20, // Title font size
          weight: "bold", // Optional: Font weight
        },
        color: "#333", // Title text color
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Publish Date",
          font: {
            family: '"Roboto", sans-serif', // X-axis title font family
            size: 14, // X-axis title font size
          },
        },
        ticks: {
          font: {
            family: '"Roboto", sans-serif', // X-axis ticks font family
            size: 12, // X-axis ticks font size
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Topics",
          font: {
            family: '"Roboto", sans-serif', // Y-axis title font family
            size: 14, // Y-axis title font size
          },
        },
        ticks: {
          font: {
            family: '"Roboto", sans-serif', // Y-axis ticks font family
            size: 12, // Y-axis ticks font size
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default UrduBarGraph;

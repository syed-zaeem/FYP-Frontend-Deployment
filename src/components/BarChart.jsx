import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// Registering Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const BarChart = (data) => {
  // Process data for Chart.js
  const graphData = data.merged_topics.map((topic) => ({
    date: topic.topics.map((item) => item.publish_date),
    docCount: topic.topics.map((item) => item.docCount),
    topicsInfo: topic.topics.map((item) =>
      item.topics.map((subTopic) => {
        const key = Object.keys(subTopic)[0];
        const details = subTopic[key];
        return `• Topic: ${details.topic} \n`;
      })
    ),
  }));

  // Flatten data for graph rendering
  const labels = graphData.flatMap((item) => item.date);
  const docCounts = graphData.flatMap((item) => item.docCount);
  const topicsInfo = graphData.flatMap((item) => item.topicsInfo);

  // Prepare data for Chart.js
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Number of Topics',
        data: docCounts,
        backgroundColor: 'rgba(136, 132, 216, 0.8)',
        borderColor: '#8884d8',
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  // Configure chart options
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          afterLabel: (tooltipItem) => {
            const index = tooltipItem.dataIndex;
            const subtopics = topicsInfo[index];
            return `Details:\n${subtopics.join('\n')}`;
          },
        },
      },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Urdu Entity Bar Graph',
        font: { size: 20 },
      },
    },
    scales: {
      x: { title: { display: true, text: 'Publish Date' } },
      y: { title: { display: true, text: 'Number of Topics' }, beginAtZero: true },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
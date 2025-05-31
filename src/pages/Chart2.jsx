import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const Chart2 = () => {

  const { trendingTopics } = useSelector((state) => state.trendingTopics)

  // const topEntities = [
  //   {
  //     entity: "پاکستان",
  //     entity_count: 23,
  //   },
  //   {
  //     entity: "عمران خان",
  //     entity_count: 19,
  //   },
  //   {
  //     entity: "حکومت",
  //     entity_count: 18,
  //   },
  //   {
  //     entity: "ملک",
  //     entity_count: 12,
  //   },
  //   {
  //     entity: "عدلیہ",
  //     entity_count: 10,
  //   },
  //   {
  //     entity: "تحریک انصاف",
  //     entity_count: 9,
  //   },
  //   {
  //     entity: "گندم",
  //     entity_count: 8,
  //   },
  //   {
  //     entity: "کتاب",
  //     entity_count: 8,
  //   },
  //   {
  //     entity: "چائنا",
  //     entity_count: 8,
  //   },
  //   {
  //     entity: "سپریم کورٹ",
  //     entity_count: 8,
  //   },
  // ];

  const [options, setOptions] = useState({
    chart: {
      width: 800,
      type: "pie",
      fontFamily: '"Noto Nastaliq Urdu Medium", sans-serif', // Set your custom font here
    },
    labels: trendingTopics.map((entity) => entity.entity),
    dataLabels: {
      style: {
        fontSize: "18px", // Change the font size here
      },
    },
    tooltip: {
      style: {
        fontSize: "16px", // Set the font size for the tooltip
        fontFamily: '"Noto Nastaliq Urdu Medium", sans-serif', // Set your custom font here
        color: "#fff", // Tooltip text color
        background: "#333", // Background color of the tooltip
      },
    },
    legend: {
      position: "right", // Set position of the legend (right, bottom, etc.)
      fontSize: "14px", // Set the desired font size for the legend labels
      fontFamily: '"Noto Nastaliq Urdu Medium", sans-serif', // Set your custom font here
      fontWeight: 600, // Optional: change the font weight
      labels: {
        colors: "#000", // Optionally, change the font color of the legend
        useSeriesColors: false, // Ensures font color doesn't inherit series color
      },
    },
    responsive: [
      {
        breakpoint: 2000,
        options: {
          chart: {
            width: 850,
          },
          legend: {
            position: "right",
            fontSize: "15px", // Set the desired font size for the legend labels
            fontWeight: 600, // Optional: change the font weight
            labels: {
              colors: "#000", // Optionally, change the font color of the legend
              useSeriesColors: false, // Ensures font color doesn't inherit series color
            },
          },
        },
      },
      {
        breakpoint: 1280,
        options: {
          chart: {
            width: 800,
          },
          legend: {
            position: "bottom",
            fontSize: "17px", // Set the desired font size for the legend labels
            fontWeight: 600, // Optional: change the font weight
            labels: {
              colors: "#000", // Optionally, change the font color of the legend
              useSeriesColors: false, // Ensures font color doesn't inherit series color
            },
          },
        },
      },
      {
        breakpoint: 1024,
        options: {
          chart: {
            width: 720,
          },
          dataLabels: {
            style: {
              fontSize: "16px", // Change the font size here
              fontWeight: 400,
            },
          },
          legend: {
            position: "bottom",
            fontSize: "18px", // Set the desired font size for the legend labels
            fontWeight: 600, // Optional: change the font weight
            labels: {
              colors: "#000", // Optionally, change the font color of the legend
              useSeriesColors: false, // Ensures font color doesn't inherit series color
            },
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            width: 650,
          },
          legend: {
            position: "bottom",
            fontSize: "18px", // Set the desired font size for the legend labels
            fontWeight: 600, // Optional: change the font weight
            labels: {
              colors: "#000", // Optionally, change the font color of the legend
              useSeriesColors: false, // Ensures font color doesn't inherit series color
            },
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 450,
            fontSize: "2px",
          },
          dataLabels: {
            style: {
              fontSize: "14px", // Change the font size here
              fontWeight: 400,
            },
          },
          tooltip: {
            style: {
              fontSize: "12px", // Set the font size for the tooltip
              color: "#fff", // Tooltip text color
              background: "#333", // Background color of the tooltip
            },
          },
          legend: {
            position: "bottom",
            fontSize: "12px", // Set the desired font size for the legend labels
            fontWeight: 600, // Optional: change the font weight
            labels: {
              colors: "#000", // Optionally, change the font color of the legend
              useSeriesColors: false, // Ensures font color doesn't inherit series color
            },
          },
        },
      },
    ],
  });

  const [series, setSeries] = useState(
    trendingTopics.map((entity) => entity.data.length)
  );

  return (
    <section className="mx-[6%] flex items-center justify-center mt-12 sm:mx-[2%] md:mx-[5%] lg:mx-[12%] xl:mx-[22%]">
      <ReactApexChart options={options} series={series} type="pie" />
    </section>
  );
};

export default Chart2;

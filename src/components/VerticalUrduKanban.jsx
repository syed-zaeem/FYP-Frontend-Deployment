import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaBook, FaCalendarAlt } from "react-icons/fa"; // Professional icons
import { useSelector } from "react-redux";

const VerticalUrduKanban = () => {
  const [topics, setTopics] = React.useState([]);
  const [monthWiseTopics, setMonthWiseTopics] = useState(null)
  const [selectedTopic, setSelectedTopic] = useState("");
  const { trendingTopics } = useSelector((state) => state.trendingTopics);

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

  console.log("The trending entities kanban are: ", trendingTopics);
  console.log("The parsed entities kanban are: ", parsedEntities);

  const groupTopicsByMonthForEntity = (parsedEntities, targetEntity) => {
    const monthNames = {
      0: "جنوری",
      1: "فروری",
      2: "مارچ",
      3: "اپریل",
      4: "مئی",
      5: "جون",
      6: "جولائی",
      7: "اگست",
      8: "ستمبر",
      9: "اکتوبر",
      10: "نومبر",
      11: "دسمبر",
    };

    // Find the target entity
    const entityObj = parsedEntities.find((e) => e.entity === targetEntity);

    if (!entityObj) {
      console.log(`Entity '${targetEntity}' not found.`);
      return {};
    }

    const { data } = entityObj;
    const result = {};

    data.forEach((entry) => {
      const date = new Date(entry.specific_date);
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      const monthYearKey = `${year} ${month}`;

      if (!result[monthYearKey]) {
        result[monthYearKey] = [];
      }

      // Add topics to the month-year grouping
      entry.topics.forEach((topic) => {
        if (!result[monthYearKey].includes(topic)) {
          result[monthYearKey].push(topic);
        }
      });
    });

    return result;
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
    console.log("The selected topic is: ", event.target.value);

    const monthWiseTopicsForEntity = groupTopicsByMonthForEntity(
      parsedEntities,
      // "پاکستان"
      event.target.value
    );

    console.log(monthWiseTopicsForEntity);
    setMonthWiseTopics(monthWiseTopicsForEntity)
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceList = Array.from(topics[source.droppableId]);
    const destinationList = Array.from(topics[destination.droppableId]);

    const [movedItem] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedItem);

    setTopics({
      ...topics,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList,
    });
  };

  return (
    <section className="mx-[6%] sm:mx-[8%] md:mx-[10%] lg:mx-[15%] xl:mx-[16%]">
      <div className="space-y-4" dir="rtl">
        {/* Section Heading */}
        <h1 className="text-xl sm:text-2xl md:text-[22px] lg:text-2xl text-center font-semibold text-gray-800 mb-8">
          Select any Trend
        </h1>

        {/* Radio Buttons */}
        <div className="flex justify-between flex-wrap md:mx-[5%] lg:mx-[8%]">
          {parsedEntities.map((item, index) => (
            <label
              key={index}
              className="flex w-[40%] sm:w-[33%] md:w-[25%] my-1 items-center gap-3 cursor-pointer text-gray-800 text-[17px] font-urdunormal hover:text-violet-600 transition duration-300"
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
        </div>
       {monthWiseTopics ? <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            padding: "20px",
            // backgroundColor: "#f9fafb",
            // border: "2px solid red",
            maxWidth: "1200px",
            margin: "20px auto",
            direction: "rtl", // Right-to-left alignment
          }}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              {Object.entries(monthWiseTopics).map(
                ([monthYear, topicsList]) => (
                  <Droppable key={monthYear} droppableId={monthYear}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          flex: "1 1 calc(50% - 20px)", // Two cards per row
                          maxWidth: "500px",
                          border: "1px solid #e5e7eb",
                          borderRadius: "12px",
                          backgroundColor: "#ffffff",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          padding: "20px",
                          minWidth: "300px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "15px",
                            borderBottom: "2px solid #1d4ed8",
                            paddingBottom: "5px",
                          }}
                        >
                          <h3
                            style={{
                              fontSize: "1.5rem",
                              color: "rgb(79, 70, 229)",
                              background:
                                "linear-gradient(90deg, #3b82f6, #60a5fa)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "rgb(79, 70, 229)",
                              fontWeight: "bold",
                              textAlign: "right",
                              fontFamily: '"Noto Nastaliq Urdu", "Helvetica", sans-serif'
                            }}
                          >
                            {monthYear}
                          </h3>
                          <FaCalendarAlt
                            style={{ fontSize: "1.5rem", color: "rgb(79, 70, 229)" }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          {topicsList.map((topic, index) => (
                            <Draggable
                              key={topic}
                              draggableId={topic}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: "20px",
                                    padding: "15px",
                                    borderRadius: "8px",
                                    backgroundColor: "",
                                    // border: "1px solid #0288d1",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    color: "#1948e3",
                                    fontSize: "15px",
                                    fontFamily: "Noto Nastaliq Urdu Medium",
                                    transition:
                                      "transform 0.3s ease, box-shadow 0.3s",
                                    ...provided.draggableProps.style,
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.boxShadow =
                                      "0 4px 8px rgba(0, 0, 0, 0.15)")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.boxShadow =
                                      "0 2px 4px rgba(0, 0, 0, 0.1)")
                                  }
                                >
                                  <span
                                    style={{
                                      marginRight: "8px",
                                      textAlign: "right",
                                    }}
                                  >
                                    {topic}
                                  </span>
                                  <FaBook
                                    style={{
                                      color: "#1948e3",
                                      fontSize: "1.2rem",
                                    }}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )
              )}
            </div>
          </DragDropContext>
        </div> : <h3 className="text-lg">No trend is selected</h3>}
      </div>
    </section>
  );
};

export default VerticalUrduKanban;

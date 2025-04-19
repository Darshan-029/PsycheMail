import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#00C49F", "#FF8042", "#8884d8"];

const App = () => {
  const [feedbackCounts, setFeedbackCounts] = useState({
    positive: 0,
    negative: 0,
    neutral: 0,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const formatted = [
      { name: "Positive", value: feedbackCounts.positive },
      { name: "Negative", value: feedbackCounts.negative },
      { name: "Neutral", value: feedbackCounts.neutral },
    ];
    setChartData(formatted);
  }, [feedbackCounts]);

  const fetchFeedbackCounts = async () => {
    console.log("function called");
    try {
      const response = await fetch("http://localhost:5000/feedback-counts");
      const data = await response.json();

      setFeedbackCounts(data);
    } catch (error) {
      console.error("Error fetching feedback counts:", error);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Live Feedback Sentiment</h2>
      <PieChart width={600} height={400} margin={3}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <button
        className={"btn btn-primary"}
        style={{ marginTop: "1rem" }}
        onClick={fetchFeedbackCounts}
      >
        Simulate New Feedback
      </button>
    </div>
  );
};

export default App;

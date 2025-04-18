import React, { useState, useEffect } from "react";

function Sentiment() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [storedFeedbacks, setStoredFeedbacks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/analyze-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedbacks }),
      });

      const result = await response.json();
      setAnalysis(result);

      for (let feedback of result) {
        await fetch("http://localhost:5000/save-feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedback),
        });
      }

      fetchStoredFeedbacks();
    } catch (error) {
      console.error("Error processing feedback:", error);
    }
  };

  const fetchStoredFeedbacks = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-feedbacks");
      const data = await response.json();
      setStoredFeedbacks(data);
    } catch (error) {
      console.error("Error fetching stored feedbacks:", error);
    }
  };

  const handleGenerateMail = async (id, feedback) => {
    try {
      const response = await fetch("http://localhost:5000/generate-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedbacks: [feedback] }),
      });

      const result = await response.json();
      const emailResponse = result[0]?.message || "No email generated";

      await fetch("http://localhost:5000/update-feedback-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, emailResponse }),
      });

      fetchStoredFeedbacks();
    } catch (error) {
      console.error("Error generating email:", error);
    }
  };

  useEffect(() => {
    fetchStoredFeedbacks();
  }, []);

  return (
    <div>
      <h1>Feedback Sentiment Analysis</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter feedbacks separated by commas"
          onChange={(e) => setFeedbacks(e.target.value.split(","))}
        />
        <button type="submit">Analyze</button>
      </form>
      <div>
        <h2>Stored Feedbacks:</h2>
        {storedFeedbacks.map((feedback) => (
          <div key={feedback._id}>
            <p>
              <strong>Text:</strong> {feedback.text}
            </p>
            <p>
              <strong>Score:</strong> {feedback.score}
            </p>
            <p>
              <strong>Sentiment:</strong> {feedback.sentiment}
            </p>
            <p>
              <strong>Constructive:</strong> {feedback.constructive}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {feedback.emailResponse || "No email generated yet"}
            </p>
            <button
              onClick={() => handleGenerateMail(feedback._id, feedback.text)}
            >
              Generate Mail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sentiment;

import React, { useState } from "react";

function Sentiment() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [email, setEmails] = useState([]);

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
          body: JSON.stringify(feedback), // Send the entire feedback object
        });
      }
    } catch (error) {
      console.error("Error analyzing feedback:", error);
    }

    try {
      const response = await fetch("http://localhost:5000/generate-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedbacks }),
      });

      const result2 = await response.json();
      setEmails(result2);
    } catch (error) {
      console.error("Error generating email", error);
    }
  };

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
        <h2>Analysis Results:</h2>
        {analysis.map((result, index) => (
          <div key={index}>
            <p>
              <strong>Text:</strong> {result.text}
            </p>
            <p>
              <strong>Score:</strong> {result.score}
            </p>
            <p>
              <strong>Sentiment:</strong> {result.sentiment}
            </p>
            <p>
              <strong>Constructive Criticism:</strong> {result.constructive}
            </p>
          </div>
        ))}
      </div>
      <div>
        <h2>Email: </h2>
        {email.map((result2, index) => (
          <div key={index}>
            <p>
              <strong>Text:</strong> {result2.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sentiment;

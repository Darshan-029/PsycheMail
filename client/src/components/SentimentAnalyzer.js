import { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

const SentimentAnalyzer = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [storedFeedbacks, setStoredFeedbacks] = useState([]);

  const handleSubmit = async (e) => {
    // e.preventDefault();

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

  const handleDeleteFeedback = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/delete-feedback/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Feedback deleted successfully");
        fetchStoredFeedbacks(); // Refresh the feedback list after deletion
      } else {
        console.error("Failed to delete feedback");
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  useEffect(() => {
    fetchStoredFeedbacks();
  }, []);

  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [score, setScore] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeSentiment = () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);

    // Simulate AI analysis with a simple algorithm (would be replaced by API call)
    setTimeout(() => {
      // Simple sentiment detection based on keywords
      const lowerText = text.toLowerCase();
      let sentimentResult = "neutral";
      let scoreResult = 0;

      const positiveWords = [
        "love",
        "great",
        "excellent",
        "amazing",
        "good",
        "happy",
        "best",
        "wonderful",
        "fantastic",
      ];
      const negativeWords = [
        "hate",
        "terrible",
        "awful",
        "bad",
        "worst",
        "disappointing",
        "horrible",
        "poor",
        "angry",
      ];

      let positiveCount = 0;
      let negativeCount = 0;

      // Count positive and negative words
      positiveWords.forEach((word) => {
        const regex = new RegExp(`\\b${word}\\b`, "g");
        const matches = lowerText.match(regex);
        if (matches) positiveCount += matches.length;
      });

      negativeWords.forEach((word) => {
        const regex = new RegExp(`\\b${word}\\b`, "g");
        const matches = lowerText.match(regex);
        if (matches) negativeCount += matches.length;
      });

      // Calculate sentiment
      if (positiveCount > negativeCount) {
        sentimentResult = "positive";
        scoreResult = Math.min(
          0.9,
          0.5 + (positiveCount - negativeCount) * 0.1
        );
      } else if (negativeCount > positiveCount) {
        sentimentResult = "negative";
        scoreResult = Math.max(
          -0.9,
          -0.5 - (negativeCount - positiveCount) * 0.1
        );
      } else {
        sentimentResult = "neutral";
        scoreResult = 0;
      }

      setSentiment(sentimentResult);
      setScore(scoreResult);
      setIsAnalyzing(false);
    }, 1000);
  };

  return (
    <div className="glass-card" style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px" }}>Sentiment Analyzer</h2>

      <div>
        <textarea
          value={text}
          onChange={(e) => {
            setFeedbacks(e.target.value.split(","));
            setText(e.target.value);
          }}
          placeholder="Enter text to analyze sentiment..."
          style={{
            height: "150px",
            resize: "vertical",
            width: "100%",
            padding: "15px",
          }}
        />

        <button
          className="btn btn-primary"
          onClick={() => {
            analyzeSentiment();
            handleSubmit();
          }}
          disabled={isAnalyzing || !text.trim()}
          style={{ marginTop: "15px" }}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Sentiment"}
        </button>

        {sentiment && (
          <div
            className="glass-card animate-fadeIn"
            style={{
              marginTop: "20px",
              padding: "20px",
              backgroundColor:
                sentiment === "positive"
                  ? "rgba(6, 190, 119, 0.1)"
                  : sentiment === "negative"
                  ? "rgba(255, 99, 71, 0.1)"
                  : "rgba(127, 221, 255, 0.1)",
            }}
          >
            <h3 style={{ marginBottom: "1.5rem" }}>Analysis Result</h3>
            {[...storedFeedbacks].reverse().map((feedback) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "2rem",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className={`tag tag-${feedback.sentiment}`}
                      style={{ width: "50%" }}
                    >
                      <b>
                        "
                        {feedback.text.charAt(0).toUpperCase() +
                          feedback.text.slice(1)}{" "}
                        "
                      </b>{" "}
                      is a {feedback.sentiment} comment.
                    </div>

                    <div className={`tag tag-${feedback.sentiment}`}>
                      Constructive Criticism: {feedback.constructive}
                    </div>

                    <div style={{ fontSize: "14px", color: "#fee12b" }}>
                      Score: {feedback.score?.toFixed(2)}
                    </div>
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    <p>
                      {feedback.sentiment === "Positive"
                        ? "This text has a positive sentiment. The tone is favorable and conveys satisfaction or happiness."
                        : feedback.sentiment === "Negative"
                        ? "This text has a negative sentiment. The tone is unfavorable and may express dissatisfaction or frustration."
                        : "This text has a neutral sentiment. The tone is balanced or factual without strong emotion."}
                    </p>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "14px",
                        marginBottom: "1.5rem",
                        border: "0.5px solid white",
                        borderRadius: "1rem",
                        padding: "0.5rem",
                      }}
                    >
                      <strong style={{ color: "#fee12b" }}>Email:</strong>{" "}
                      <i>
                        {feedback.emailResponse || "No email generated yet"}
                      </i>
                    </div>
                  </div>

                  <div style={{ display: "flex" }}>
                    {!feedback.emailResponse ? (
                      <div style={{ marginBottom: "1.5rem" }}>
                        <button
                          className="btn btn-secondary"
                          style={{ marginRight: "10px" }}
                          onClick={() =>
                            handleGenerateMail(feedback._id, feedback.text)
                          }
                        >
                          Generate Email Response
                        </button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div style={{ marginBottom: "1.5rem" }}>
                      <button
                        className="btn btn-accent"
                        onClick={() => handleDeleteFeedback(feedback._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <hr></hr>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className="glass-card animate-fadeIn"
        style={{
          display: "flex",
          height: "33rem",
          marginTop: "1rem",
          justifyContent: "space-evenly",
          backgroundColor: "rgba(127, 221, 255, 0.03)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0.5rem",
            width: "33.3%",
            margin: "0.5rem",
            border: "0.5px solid white",
            borderRadius: "1.5rem",
            backgroundColor: "rgba(6, 190, 119, 0.1)",
            alignItems: "center",
          }}
        >
          <h3>Positive Feedback</h3>
          {[...storedFeedbacks].reverse().map((feedback) =>
            feedback.sentiment === "Positive" ? (
              <div
                className={`tag tag-${feedback.sentiment}`}
                style={{
                  width: "100%",
                  marginBottom: "0.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <b>
                  "
                  {feedback.text.charAt(0).toUpperCase() +
                    feedback.text.slice(1)}{" "}
                  "
                </b>
                <CancelIcon
                  onClick={() => handleDeleteFeedback(feedback._id)}
                />
              </div>
            ) : (
              <div></div>
            )
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0.5rem",
            width: "33.3%",
            margin: "0.5rem",
            border: "0.5px solid white",
            borderRadius: "1.5rem",
            backgroundColor: "rgba(127, 221, 255, 0.1)",
            alignItems: "center",
          }}
        >
          <h3>Neutral Feedback</h3>
          {[...storedFeedbacks].reverse().map((feedback) =>
            feedback.sentiment === "Neutral" ? (
              <div
                className={`tag tag-${feedback.sentiment}`}
                style={{
                  width: "100%",
                  marginBottom: "0.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <b>
                  "
                  {feedback.text.charAt(0).toUpperCase() +
                    feedback.text.slice(1)}{" "}
                  "
                </b>
                <CancelIcon
                  onClick={() => handleDeleteFeedback(feedback._id)}
                />
              </div>
            ) : (
              <div></div>
            )
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0.5rem",
            width: "33.3%",
            margin: "0.5rem",
            border: "0.5px solid white",
            borderRadius: "1.5rem",
            backgroundColor: "rgba(255, 99, 71, 0.1)",
            alignItems: "center",
          }}
        >
          <h3>Negative Feedback</h3>
          {[...storedFeedbacks].reverse().map((feedback) =>
            feedback.sentiment === "Negative" ? (
              <div
                className={`tag tag-${feedback.sentiment}`}
                style={{
                  width: "100%",
                  marginBottom: "0.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <b>
                  "
                  {feedback.text.charAt(0).toUpperCase() +
                    feedback.text.slice(1)}{" "}
                  "
                </b>
                <CancelIcon
                  onClick={() => handleDeleteFeedback(feedback._id)}
                />
              </div>
            ) : (
              <div></div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalyzer;

import { useState, useEffect } from "react";

const SmartEmail = () => {
  const [subject, setSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [category, setCategory] = useState("informative");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [email, setEmail] = useState("Start");

  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log(feedbacks);

    try {
      const response = await fetch("http://localhost:5000/analyze-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedbacks: feedbacks }),
      });

      const result = await response.json();
      setAnalysis(result[0].text);
      console.log(result[0].text);
      return result[0].text;
    } catch (error) {
      console.error("Error processing feedback:", error);
      return "";
    }
  };

  const handleGenerateMail = async (analysisResult) => {
    console.log(analysis);
    try {
      const response = await fetch("http://localhost:5000/generate-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedbacks: analysisResult }),
      });

      const result = await response.json();
      const emailResponse = result[0]?.message || "No email generated";
      setEmail(emailResponse);
      console.log(email);
      return emailResponse;
    } catch (error) {
      console.error("Error generating email:", error);
      return "No email generated";
    }
  };

  useEffect(() => {
    console.log("Updated email:", email);
  }, [email]);

  const generateEmail = (emailResponse) => {
    if (!emailContent.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      // Generate response based on sentiment and category
      let responseBody = `Dear Customer,\n\nYou wrote:\n"${emailContent}"\n\n${emailResponse}\n\nRegards,\nThe InScribe AI Team`;

      setGeneratedEmail({
        subject: "Response to your message",
        body: responseBody,
        sentiment: "neutral",
        category,
      });

      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="glass-card" style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px" }}>Smart Email Assistant</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Subject (optional)
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            placeholder="Email subject"
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Message Content
          </label>
          <textarea
            value={emailContent}
            onChange={(e) => {
              setEmailContent(e.target.value);
              const combinedFeedback = `${subject} ${e.target.value}`.trim();
              setFeedbacks([combinedFeedback]);
            }}
            placeholder="Enter customer message to generate a response..."
            style={{
              height: "120px",
              resize: "vertical",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="urgent">Urgent</option>
            <option value="informative">Informative</option>
            <option value="promotional">Promotional</option>
          </select>
        </div>

        <button
          className="btn btn-primary"
          onClick={async () => {
            const analysisResult = await handleSubmit();
            const emailResponse = await handleGenerateMail(analysisResult);
            generateEmail(emailResponse);
          }}
          disabled={isGenerating || !emailContent.trim()}
        >
          {isGenerating ? "Generating Response..." : "Generate AI Response"}
        </button>

        {generatedEmail && (
          <div
            className="glass-card animate-fadeIn"
            style={{ marginTop: "15px", padding: "20px" }}
          >
            <h3 style={{ marginBottom: "15px" }}>Generated Email Response</h3>

            <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
              <div className={`tag tag-${generatedEmail.sentiment}`}>
                {generatedEmail.sentiment.charAt(0).toUpperCase() +
                  generatedEmail.sentiment.slice(1)}
              </div>

              <div className={`tag tag-${generatedEmail.category}`}>
                {generatedEmail.category.charAt(0).toUpperCase() +
                  generatedEmail.category.slice(1)}
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <strong>Subject:</strong> {generatedEmail.subject}
              </div>
              <div style={{ whiteSpace: "pre-line" }}>
                <strong>Message:</strong>
                <br />
                {generatedEmail.body}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button className="btn btn-secondary">Edit Response</button>
              <button className="btn btn-accent">Send Email</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartEmail;

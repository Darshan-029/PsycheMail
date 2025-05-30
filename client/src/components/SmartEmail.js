import { useState, useEffect } from "react";

const SmartEmail = () => {
  const [subject, setSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [category, setCategory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [email, setEmail] = useState("Start");
  const [isTouched, setIsTouched] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);
  const [error, setError] = useState(false);
  const [language, setLanguage] = useState("English");

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

  const generateEmail = (emailResponse) => {
    if (!emailContent.trim()) {
      setError(true);
      setIsTouched(true);
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 500);
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      let responseBody = `Dear Customer,\n\nYou wrote:\n"${emailContent}"\n\n${emailResponse}\n\nRegards,\nThe PsycheMail AI Team`;

      setGeneratedEmail({
        subject: "Response to your message",
        body: responseBody,
        sentiment: "neutral",
        category,
      });

      setIsGenerating(false);
    }, 1500);
  };

  const handleBlur = () => {
    setIsTouched(true);
    if (!emailContent.trim()) {
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 500);
    }
  };

  useEffect(() => {
    const combinedFeedback =
      `${subject} ${emailContent}. Give response in ${language} language and in ${category} tone.`.trim();
    setFeedbacks([combinedFeedback]);
  }, [subject, emailContent, language, category]);

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
            }}
            onBlur={handleBlur}
            placeholder="Enter customer message to generate a response..."
            style={{
              height: "120px",
              resize: "vertical",
            }}
            className={`${
              isTouched && !emailContent.trim() ? "form-control-error" : ""
            } ${shouldShake ? "shake" : ""}`}
          />
          {isTouched && !emailContent.trim() && (
            <div className="error-text">This field is required</div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            padding: "1rem",
          }}
        >
          <div style={{ width: "40%", marginRight: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Translate to
            </label>
            <select
              value={language}
              onChange={(e) => {
                const selectedLanguage = e.target.value;
                setLanguage(selectedLanguage);
              }}
              style={{
                backgroundColor: "rgba(41, 41, 48, 0.56)",
                color: "white",
                padding: "1rem",
              }}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="Hindi">Hindi</option>
              <option value="Urdu">Urdu</option>
              <option value="Persian">Persian</option>
              <option value="Arabic">Arabic</option>
              <option value="German">German</option>
              <option value="French">French</option>
              <option value="Japanese">Japanese</option>
              <option value="Mandrin">Mandrin</option>
              <option value="Portuguese">Portuguese</option>
            </select>
          </div>

          <div style={{ width: "40%", marginRight: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Tone of Reply
            </label>
            <select
              value={category}
              onChange={(e) => {
                const selectedcategory = e.target.value;
                setCategory(selectedcategory);
              }}
              style={{
                backgroundColor: "rgba(41, 41, 48, 0.56)",
                color: "white",
                padding: "1rem",
              }}
            >
              <option value="informative">Informative</option>
              <option value="urgent">Urgent</option>
              <option value="promotional">promotional</option>
            </select>
          </div>
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

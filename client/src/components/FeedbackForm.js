import { useState } from "react";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    feedback: false,
    email: false,
  });
  const [shouldShake, setShouldShake] = useState({
    feedback: false,
    email: false,
  });

  const handleBlur = (field) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    if (!getFieldValue(field).trim()) {
      setShouldShake((prev) => ({ ...prev, [field]: true }));
      setTimeout(
        () => setShouldShake((prev) => ({ ...prev, [field]: false })),
        500
      );
    }
  };

  const getFieldValue = (field) => {
    return field === "feedback" ? feedback : email;
  };

  const isFieldInvalid = (field) => {
    return touchedFields[field] && !getFieldValue(field).trim();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouchedFields({ feedback: true, email: true });

    if (!feedback.trim() || !email.trim()) {
      setShouldShake({
        feedback: !feedback.trim(),
        email: !email.trim(),
      });
      setTimeout(() => setShouldShake({ feedback: false, email: false }), 500);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setFeedback("");
      setEmail("");
      setIsSubmitting(false);
      setTouchedFields({ feedback: false, email: false });
      alert("Thank you for your feedback!");
    }, 1000);
  };

  return (
    <div className="glass-card" style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px" }}>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <textarea
            className={`${
              isFieldInvalid("feedback") ? "form-control-error" : ""
            } ${shouldShake.feedback ? "shake" : ""}`}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            onBlur={() => handleBlur("feedback")}
            placeholder="Enter your feedback..."
            style={{
              height: "150px",
              resize: "vertical",
              width: "100%",
              padding: "15px",
            }}
          />
          {isFieldInvalid("feedback") && (
            <div className="error-text">Feedback is required</div>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="email"
            className={`${
              isFieldInvalid("email") ? "form-control-error" : ""
            } ${shouldShake.email ? "shake" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder="Enter your email..."
            style={{
              width: "100%",
              padding: "15px",
            }}
          />
          {isFieldInvalid("email") && (
            <div className="error-text">Email is required</div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting || !feedback.trim() || !email.trim()}
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;

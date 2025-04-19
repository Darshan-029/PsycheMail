import React from "react";

const UndNav = () => {
  return (
    <div
      className="UndNavContainer"
      style={{ marginTop: "80px", marginBottom: "70px" }}
    >
      <div>
        <h1 className="text-gradient" style={{ fontSize: "3rem", margin: 0 }}>
          AI RESPONSE GENERATOR
        </h1>
      </div>
      <div
        style={{
          maxWidth: "1200px",
          width: "50%",
          marginTop: "20px",
        }}
      >
        <p style={{ fontSize: "1.2rem", margin: 0, textAlign: "center" }}>
          Instantly analyze customer feedback tone (😊 Positive | 😐 Neutral |
          😠 Negative) and generate perfect email responses in seconds—No login
          required!
        </p>
      </div>
    </div>
  );
};

export default UndNav;

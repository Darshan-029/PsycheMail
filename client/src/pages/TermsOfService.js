import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsOfService = () => {
  return (
    <div className="container">
      <Navbar />

      <div
        className="glass-card"
        style={{ padding: "40px", marginTop: "30px" }}
      >
        <h2 className="text-gradient" style={{ marginBottom: "20px" }}>
          Terms of Service
        </h2>

        <p>
          <strong>Effective Date:</strong> April 18, 2025
        </p>

        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing or using <strong>InScribe AI</strong>, you agree to be
          bound by these Terms of Service. If you do not agree, please do not
          use the app.
        </p>

        <h3>2. Use of the Service</h3>
        <p>
          InScribe AI is a tool for analyzing text sentiment and generating
          smart email responses. You agree not to misuse the service or use it
          for any unlawful or abusive purposes.
        </p>

        <h3>3. User Input & Content</h3>
        <p>
          Any data you input is processed only to provide the intended
          functionality (e.g., sentiment analysis and email drafting). We do not
          store or use your data beyond your current session.
        </p>

        <h3>4. Intellectual Property</h3>
        <p>
          All content and code used in this project, including branding and UI,
          is the intellectual property of <strong>Team ByteMe</strong>, unless
          otherwise stated.
        </p>

        <h3>5. Limitation of Liability</h3>
        <p>
          InScribe AI is a prototype created for educational and hackathon
          purposes. We make no warranties regarding performance or accuracy. Use
          at your own discretion.
        </p>

        <h3>6. Modifications</h3>
        <p>
          We may update these Terms at any time. Continued use of the service
          after updates constitutes acceptance of the new terms.
        </p>

        <h3>7. Contact</h3>
        <p>
          For any questions or concerns, contact us at: <br />
          📧 <em>ByteMeTeam@inscribe.dev</em>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;

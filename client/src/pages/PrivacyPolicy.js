import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="container">
      <Navbar />

      <div
        className="glass-card"
        style={{ padding: "40px", marginTop: "30px" }}
      >
        <h2 className="text-gradient" style={{ marginBottom: "20px" }}>
          Privacy Policy
        </h2>
        <p>
          <strong>Last updated:</strong> April 18, 2025
        </p>

        <p style={{ marginBottom: "20px" }}>
          Welcome to <strong>InScribe AI</strong>, your smart assistant for
          AI-powered sentiment analysis and email generation. This Privacy
          Policy outlines how we collect, use, and protect your information when
          you use our platform.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We do <strong>not collect or store any personal data</strong> from
          users during the usage of the InScribe AI tool. All input is processed{" "}
          <em>locally</em> or in temporary memory.
        </p>
        <ul style={{ marginBottom: "20px" }}>
          <li>No user account is required.</li>
          <li>No email, location, or device data is collected.</li>
          <li>No cookies or trackers are used.</li>
        </ul>

        <h2>2. How We Use Your Input</h2>
        <p>
          Input data such as feedback or message content is used{" "}
          <strong>only</strong> for:
        </p>
        <ul style={{ marginBottom: "20px" }}>
          <li>Analyzing sentiment</li>
          <li>Generating AI-based responses</li>
          <li>Visualizing input data for demos</li>
        </ul>

        <h2>3. Data Security</h2>
        <p style={{ marginBottom: "20px" }}>
          We implement best practices to ensure your input data remains secure
          during your session. Nothing is stored or reused beyond the active
          session.
        </p>

        <h2>4. Third-Party Services</h2>
        <p style={{ marginBottom: "20px" }}>
          InScribe AI does <strong>not</strong> use or connect with third-party
          services. If integrated APIs are used in future versions, this policy
          will be updated.
        </p>

        <h2>5. Children's Privacy</h2>
        <p style={{ marginBottom: "20px" }}>
          This app is not intended for individuals under the age of 13. No
          information is knowingly collected from minors.
        </p>

        <h2>6. Changes to This Policy</h2>
        <p style={{ marginBottom: "20px" }}>
          We may update this policy occasionally. Changes will be posted here
          with a new date.
        </p>

        <h2>7. Contact Us</h2>
        <p style={{ marginBottom: "20px" }}>
          For questions or concerns, contact the team at: <br />
          📧 <em>ByteMeTeam@inscribe.dev</em>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div className="container">
      <Navbar />

      <div
        className="glass-card"
        style={{ padding: "40px", marginTop: "30px" }}
      >
        <h2 className="text-gradient" style={{ marginBottom: "20px" }}>
          About Us
        </h2>

        <p>
          <strong>InScribe AI</strong> was built with the vision of enhancing
          productivity and customer communication using the power of Generative
          AI. Our tool empowers businesses to instantly understand the tone of
          customer feedback and respond with intelligent, context-aware emails —
          all in a seamless interface.
        </p>

        <h3 style={{ marginTop: "30px" }}>🎯 Our Mission</h3>
        <p>
          To simplify customer engagement by making sentiment analysis and smart
          responses accessible, efficient, and intuitive using AI.
        </p>

        <h3 style={{ marginTop: "30px" }}>👨‍💻 Meet Team ByteMe</h3>
        <ul
          style={{
            listStyleType: "disc",
            paddingLeft: "20px",
            lineHeight: 1.8,
          }}
        >
          <li>
            <strong>Mustafa Malak</strong> – Frontend Developer & UI Designer
          </li>
          <li>
            <strong>Dev 2</strong> – Frontend Integration & Theme Toggle
          </li>
          <li>
            <strong>Dev 3</strong> – Backend APIs & Sentiment Engine
          </li>
          <li>
            <strong>Dev 4</strong> – Smart Email Generator & Deployment
          </li>
        </ul>

        <h3 style={{ marginTop: "30px" }}>📍 Built At</h3>
        <p>
          GenAI Buildathon & Tech Meetup, Indore <br />
          April 19–20, 2025
        </p>

        <h3 style={{ marginTop: "30px" }}>🤝 Connect With Us</h3>
        <p>
          Reach out at <em>ByteMeTeam@inscribe.dev</em> or follow us on social
          media for updates and open-source releases.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;

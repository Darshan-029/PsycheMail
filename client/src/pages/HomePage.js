import Navbar from "../components/Navbar";
import Background3D from "../components/Background3D";
import Hero from "../components/Hero";
import SentimentAnalyzer from "../components/SentimentAnalyzer";
import SmartEmail from "../components/SmartEmail";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="container">
      <Background3D />
      <Navbar />
      <main>
        <Hero />

        <div style={{ marginTop: "40px" }}>
          <h2
            className="text-gradient"
            style={{ textAlign: "center", marginBottom: "30px" }}
          >
            Our Core Features
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            <div className="glass-card">
              <h3 style={{ marginBottom: "15px" }}>Sentiment Analysis</h3>
              <p>
                Our AI-powered sentiment analysis engine detects the emotional
                tone in text, categorizing feedback as positive, neutral, or
                negative with proper rating.
              </p>
            </div>

            <div className="glass-card">
              <h3 style={{ marginBottom: "15px" }}>Smart Email Sorting</h3>
              <p>
                Generate contextually appropriate email responses based on
                sentiment detection and message category classification.
              </p>
            </div>

            <div className="glass-card">
              <h3 style={{ marginBottom: "15px" }}>Unified Dashboard</h3>
              <p>
                All your communications in one place with sentiment tracking,
                response management, and analytics to improve customer
                engagement.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

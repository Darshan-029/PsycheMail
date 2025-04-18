import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SentimentAnalyzer from "../components/SentimentAnalyzer";

const FeedbackPage = () => {
  return (
    <div className="container">
      <Navbar />
      <h2
        className="text-gradient"
        style={{ textAlign: "center", marginTop: "30px" }}
      >
        Feedback Center
      </h2>
      <SentimentAnalyzer />
      <Footer />
    </div>
  );
};

export default FeedbackPage;

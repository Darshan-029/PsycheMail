import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SmartEmail from "../components/SmartEmail";

const EmailPage = () => {
  return (
    <div className="container">
      <Navbar />
      <h2
        className="text-gradient"
        style={{ textAlign: "center", marginTop: "30px" }}
      >
        Smart Email Assistant
      </h2>
      <SmartEmail />
      <Footer />
    </div>
  );
};

export default EmailPage;

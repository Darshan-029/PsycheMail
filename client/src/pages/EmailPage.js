import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SmartEmail from "../components/SmartEmail";
import Background3D from "../components/Background3D";
const EmailPage = () => {
  return (
    <div className="container">
      <Navbar />
      <Background3D />
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

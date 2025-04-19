import Navbar from "../components/Navbar";
import Background3D from "../components/Background3D";
import Footer from "../components/Footer";
import Graph from "../components/Graph";

const Dashboard = () => {
  return (
    <div className="container">
      <Navbar />
      <Background3D />
      <div className="glass-card" style={{ padding: "40px" }}>
        <h2 className="text-gradient">Dashboard</h2>
        <Graph />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

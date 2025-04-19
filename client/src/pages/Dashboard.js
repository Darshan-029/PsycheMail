import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Graph from "../components/Graph";

const Dashboard = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="glass-card" style={{ padding: "40px" }}>
        <h2 className="text-gradient">Dashboard</h2>
        <p>Coming soon: data visualizations, charts, sentiment logs!</p>
        <Graph />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

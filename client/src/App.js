import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import FeedbackPage from "./pages/FeedbackPage";
import EmailPage from "./pages/EmailPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AboutUs from "./pages/AboutUs";
import SignUp from "./pages/SignUp";
import "./index.css";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/email" element={<EmailPage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/tos" element={<TermsOfService />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Sentiment from "./Sentiment.js";

// function App() {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/sentiment">Sentiment Analysis</Link>
//             </li>
//           </ul>
//         </nav>

//         <Routes>
//           <Route
//             path="/"
//             element={<h1>Welcome to Sentiment Analysis App</h1>}
//           />
//           <Route path="/sentiment" element={<Sentiment />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

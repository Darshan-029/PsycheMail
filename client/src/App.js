import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Sentiment from "./Sentiment.js";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/sentiment">Sentiment Analysis</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<h1>Welcome to Sentiment Analysis App</h1>}
          />
          <Route path="/sentiment" element={<Sentiment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

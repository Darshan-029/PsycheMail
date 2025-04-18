import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initially
    checkIsMobile();

    // Listen for resize events
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <nav
      className="glass-card"
      style={{ marginBottom: "30px", padding: "15px 20px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1
            className="text-gradient"
            style={{ fontSize: "1.8rem", margin: 0 }}
          >
            InScribe AI
          </h1>
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {!isMobile && (
            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="/" style={navLinkStyle}>
                Home
              </a>
              <a href="/dashboard" style={navLinkStyle}>
                Dashboard
              </a>
              <a href="/feedback" style={navLinkStyle}>
                Feedback
              </a>
              <a href="/email" style={navLinkStyle}>
                Smart Email
              </a>
            </div>
          )}

          {!isMobile && (
            <button
              className="btn btn-primary"
              href="/signup"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>
          )}

          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "white",
              }}
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && isMobile && (
        <div
          className="animate-fadeIn"
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <a href="/" style={navLinkStyle}>
            Home
          </a>
          <a href="/dashboard" style={navLinkStyle}>
            Dashboard
          </a>
          <a href="/feedback" style={navLinkStyle}>
            Feedback
          </a>
          <a href="/email" style={navLinkStyle}>
            Smart Email
          </a>
          <button
            href="/signup"
            className="btn btn-primary"
            style={{ marginTop: "0.5rem" }}
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

// Define nav link style as a constant
const navLinkStyle = {
  color: "var(--text-light)",
  textDecoration: "none",
  padding: "5px 10px",
  borderRadius: "4px",
  transition: "all 0.3s ease",
  display: "block",
};

export default Navbar;

const Footer = () => {
  return (
    <footer
      className="glass-card"
      style={{ marginTop: "40px", padding: "30px 20px", textAlign: "center" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3
            className="text-gradient"
            style={{ fontSize: "1.5rem", marginBottom: "20px" }}
          >
            PsycheMail
          </h3>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/"
              style={{ color: "var(--text-light)", textDecoration: "none" }}
            >
              Home
            </a>
            <a
              href="/Dashboard"
              style={{ color: "var(--text-light)", textDecoration: "none" }}
            >
              Dashboard
            </a>
            <a
              href="/feedback"
              style={{ color: "var(--text-light)", textDecoration: "none" }}
            >
              Feedback
            </a>
            <a
              href="/email"
              style={{ color: "var(--text-light)", textDecoration: "none" }}
            >
              Smart Email
            </a>
            <a
              href="/privacypolicy"
              style={{ color: "var(--text-light)", textDecoration: "none" }}
            >
              Privacy Policy
            </a>
            <a
              href="/tos"
              style={{ color: "var(--text-light)", textDecoration: "none" }}
            >
              Terms of Service
            </a>
            <a
              href="/aboutus"
              style={{ color: "var(--text-light)", textDecoration: "none" }}
            >
              About Us
            </a>
          </div>

          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              gap: "15px",
              justifyContent: "center",
            }}
          >
            {/* Social Media Icons */}
            <a href="#" style={{ color: "var(--text-light)" }}>
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
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" style={{ color: "var(--text-light)" }}>
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
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="#" style={{ color: "var(--text-light)" }}>
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
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" style={{ color: "var(--text-light)" }}>
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
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>

          <div style={{ opacity: 0.7, fontSize: "0.9rem" }}>
            <p>
              &copy; {new Date().getFullYear()} PsycheMail. Made by Team ByteMe
              ✨ - All rights reserved.
            </p>
            <p style={{ marginTop: "5px" }}>
              Decode Emotions. Automate Responses. Boost Productivity.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

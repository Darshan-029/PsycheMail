import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <div className="mode-toggle" style={{ marginLeft: "20px" }}>
      <input
        type="checkbox"
        id="darkModeToggle"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        style={{ display: "none" }}
      />
      <label htmlFor="darkModeToggle" className="toggle-label">
        <span className="toggle-icon"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;

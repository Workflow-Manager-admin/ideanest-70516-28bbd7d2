import React from "react";

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// PUBLIC_INTERFACE
const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => (
  <header className="vault-header">
    <div className="title-row">
      <span className="brand-title">Idea Vault</span>
    </div>
    <button className="theme-switcher" aria-label="Toggle light/dark mode" onClick={toggleTheme}>
      {theme === "light"
        ? (<svg  xmlns="http://www.w3.org/2000/svg" fill="none" height="22" width="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="currentColor"/><path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M17.36 17.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M17.36 6.64l1.42-1.42" stroke="currentColor" strokeLinecap="round"/></svg>)
        : (<svg  xmlns="http://www.w3.org/2000/svg" fill="none" height="22" width="22" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79z" fill="currentColor"/></svg>)
      }
    </button>
  </header>
);

export default Header;

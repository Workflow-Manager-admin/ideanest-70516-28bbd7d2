import React from "react";

interface Props {
  onClick: () => void;
}

// PUBLIC_INTERFACE
const FloatingAddButton: React.FC<Props> = ({ onClick }) => (
  <button
    className="floating-add-btn"
    onClick={onClick}
    title="Add note"
    aria-label="Add new note"
  >
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" fill="var(--accent-bg)" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeLinecap="round" />
    </svg>
  </button>
);

export default FloatingAddButton;

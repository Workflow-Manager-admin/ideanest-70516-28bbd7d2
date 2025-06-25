import React from "react";

interface Props {
  onAddNote: () => void;
}

// PUBLIC_INTERFACE
const EmptyState: React.FC<Props> = ({ onAddNote }) => (
  <div className="empty-state fade-in">
    <div className="empty-state-icon" aria-hidden="true">
      <svg width="56" height="56" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="6" width="20" height="20" rx="3" fill="#e2e8f0"/>
        <path d="M12 14h8M12 18h6" stroke="#64748b" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
    <p className="empty-state-msg">
      No notes yet. Click below to add your first idea!
    </p>
    <button className="add-btn" onClick={onAddNote}>Add Note</button>
  </div>
);

export default EmptyState;

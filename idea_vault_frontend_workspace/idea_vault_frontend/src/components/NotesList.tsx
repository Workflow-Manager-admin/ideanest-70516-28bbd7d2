/* eslint-disable no-unused-vars */
import React from "react";
import { Note } from "../types";

// PUBLIC_INTERFACE
const NotesList: React.FC<{
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}> = ({ notes, onEdit, onDelete }) => {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div
          className={`note-card${note.important ? " important" : ""} fade-in`}
          key={note.id}
        >
          <div className="note-header">
            <div className="note-title-row">
              <span className="note-title">
                {note.title || (
                  <span className="untitled-note">Untitled note</span>
                )}
              </span>
              {note.important && (
                <span
                  className="star-icon note-important"
                  title="Important"
                  aria-label="Important"
                  aria-hidden="false"
                >
                  ★
                </span>
              )}
            </div>
            <div className="note-created">
              {new Date(note.createdAt).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}
            </div>
          </div>
          <div className="note-body">{note.text}</div>
          <div className="note-tags-row">
            {note.tags.map((t) => (
              <span className="badge tag-badge" key={t}>
                #{t}
              </span>
            ))}
          </div>
          <div className="note-actions">
            <button
              className="action-button"
              title="Edit"
              onClick={() => onEdit(note)}
              aria-label="Edit note"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15.232 5.232l3.536 3.536-10 10H5.23v-3.536l10-10z"></path>
              </svg>
            </button>
            <button
              className="action-button"
              title="Delete"
              onClick={() => onDelete(note.id)}
              aria-label="Delete note"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 6h18M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0h8M5 6v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6"></path>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;

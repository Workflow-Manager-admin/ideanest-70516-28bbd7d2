/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from "react";
import { Note } from "../types";

/* eslint-disable @typescript-eslint/no-unused-vars */
interface Props {
  open: boolean;
  mode: "add" | "edit";
  noteData?: Note;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onAdd: (_note: Omit<Note, "id" | "createdAt">) => void;
  // eslint-disable-next-line no-unused-vars
  onUpdate: (_id: string, _note: Omit<Note, "id" | "createdAt">) => void;
}
/* eslint-enable @typescript-eslint/no-unused-vars */

// PUBLIC_INTERFACE
const NoteEditorModal: React.FC<Props> = ({
  open,
  mode,
  noteData,
  onClose,
  onAdd,
  onUpdate,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [text, setText] = useState(noteData?.text || "");
  const [tags, setTags] = useState<string[]>(noteData?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [important, setImportant] = useState(noteData?.important || false);

  const firstInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setTitle(noteData?.title || "");
      setText(noteData?.text || "");
      setTags(noteData?.tags || []);
      setTagInput("");
      setImportant(noteData?.important || false);
      setTimeout(() => {
        firstInput.current?.focus();
      }, 10);
    }
  }, [open, noteData]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = (s: string) => s.trim();
    const data = {
      title: clean(title),
      text: clean(text),
      tags: Array.from(
        new Set(tags.concat(tagInput ? [clean(tagInput)] : []))
      )
        .map((tagString) => tagString.toLowerCase())
        .filter((tagString) => tagString),
      important,
    };
    if (mode === "add") {
      onAdd(data);
    } else if (mode === "edit" && noteData) {
      onUpdate(noteData.id, data);
    }
    onClose();
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && tagInput.trim()) {
      const tag = tagInput.trim().toLowerCase();
      if (!tags.includes(tag)) setTags([...tags, tag]);
      setTagInput("");
      e.preventDefault();
    }
  }

  function removeTag(tag: string) {
    setTags(tags.filter((tagItem) => tagItem !== tag));
  }

  return open ? (
    <div className="modal-backdrop show" onClick={onClose}>
      <div className="modal-editor show" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="note-editor-form">
          <h2>{mode === "add" ? "Add Note" : "Edit Note"}</h2>
          <input
            ref={firstInput}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            maxLength={64}
            className="note-title-input"
            aria-label="Note title"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your idea here..."
            className="note-textarea"
            required
            minLength={1}
            maxLength={512}
            aria-label="Note text"
          />
          <div className="tag-row">
            {tags.map((t) => (
              <span className="badge tag-badge" key={t}>
                #{t}{" "}
                <button type="button" aria-label={`Remove tag ${t}`} onClick={() => removeTag(t)}>
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value.replace(/\s/g, ""))}
              onKeyDown={handleTagKeyDown}
              placeholder="Add tag"
              maxLength={16}
              className="tag-input"
              aria-label="Tag input"
            />
          </div>
          <label className="important-checkbox">
            <input
              type="checkbox"
              checked={important}
              onChange={() => setImportant((v) => !v)}
              aria-checked={important}
            />
            <span className="star-icon">{important ? "★" : "☆"}</span> Mark as important
          </label>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">{mode === "add" ? "Add" : "Save"}</button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default NoteEditorModal;

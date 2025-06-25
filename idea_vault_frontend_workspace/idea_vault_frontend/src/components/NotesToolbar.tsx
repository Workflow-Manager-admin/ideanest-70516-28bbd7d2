/* eslint-disable no-unused-vars */
import React from "react";
import { TagOption } from "../types";

interface NotesToolbarProps {
  search: string;
  setSearch: (val: string) => void;
  allTags: TagOption[];
  selectedTags: string[];
  setSelectedTags: (val: string[]) => void;
  importantOnly: boolean;
  setImportantOnly: (val: boolean) => void;
}

// PUBLIC_INTERFACE
const NotesToolbar: React.FC<NotesToolbarProps> = ({
  search,
  setSearch,
  allTags,
  selectedTags,
  setSelectedTags,
  importantOnly,
  setImportantOnly,
}) => {
  function toggleTag(tag: string) {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  }
  return (
    <section className="toolbar" aria-label="Filter and search">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="toolbar-search"
        placeholder="Search notes"
      />
      <div className="tag-filter-row">
        {allTags.length > 0 && (
          <div className="tags-filter">
            {allTags.map((tag) => (
              <button
                key={tag.label}
                className={`badge tag-badge${selectedTags.includes(tag.label) ? " selected" : ""}`}
                onClick={() => toggleTag(tag.label)}
                aria-pressed={selectedTags.includes(tag.label)}
              >
                #{tag.label}
                <span className="tag-count">{tag.count}</span>
              </button>
            ))}
          </div>
        )}
        <button
          className={`important-toggle${importantOnly ? " active" : ""}`}
          onClick={() => setImportantOnly(!importantOnly)}
          aria-pressed={importantOnly}
          title="Show important only"
        >
          <span className="star-icon" aria-hidden="true">
            ★
          </span>
        </button>
      </div>
    </section>
  );
};

export default NotesToolbar;

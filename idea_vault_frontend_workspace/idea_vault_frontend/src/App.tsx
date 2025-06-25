/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { Note, TagOption } from "./types";
import { loadNotes, saveNotes } from "./utils/localStorage";
import Header from "./components/Header";
import NotesToolbar from "./components/NotesToolbar";
import NotesList from "./components/NotesList";
import NoteEditorModal from "./components/NoteEditorModal";
import FloatingAddButton from "./components/FloatingAddButton";
import ConfirmDialog from "./components/ConfirmDialog";
import EmptyState from "./components/EmptyState";
import "./styles/theme.css";
import "./styles/components.css";
import "./styles/animations.css";

function getAllTags(notes: Note[]): TagOption[] {
  const tagMap: Record<string, number> = {};
  notes.forEach((note) => {
    note.tags.forEach((t) => {
      tagMap[t] = (tagMap[t] || 0) + 1;
    });
  });
  return Object.keys(tagMap).map((t) => ({
    label: t,
    count: tagMap[t],
  }));
}

// PUBLIC_INTERFACE
const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [importantOnly, setImportantOnly] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<NoteEditorData | null>(null);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const saved = loadNotes();
    setNotes(saved);
    const storedTheme = window.localStorage.getItem("theme") as "light" | "dark" | null;
    setTheme(storedTheme || "light");
    document.body.dataset.theme = storedTheme || "light";
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  function handleAddNote(note: Omit<Note, "id" | "createdAt">) {
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setNotes((old) => [newNote, ...old]);
  }

  function handleUpdateNote(noteId: string, data: Omit<Note, "id" | "createdAt">) {
    setNotes((old) =>
      old.map((n) => (n.id === noteId ? { ...n, ...data } : n))
    );
  }

  function handleDeleteNote(noteId: string) {
    setNotes((old) => old.filter((n) => n.id !== noteId));
  }

  function handleOpenEdit(note: Note) {
    setModalData({ ...note, mode: "edit" });
    setModalOpen(true);
  }

  function handleOpenAdd() {
    setModalData({ title: "", text: "", tags: [], important: false, mode: "add" });
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
    setModalData(null);
  }

  function handleConfirmDelete(id: string) {
    setToDeleteId(id);
  }

  function handleCancelDelete() {
    setToDeleteId(null);
  }

  function handleThemeToggle() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.dataset.theme = newTheme;
    window.localStorage.setItem("theme", newTheme);
  }

  const filteredNotes = notes.filter((note) => {
    const searchMatch =
      search.trim() === "" ||
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.text.toLowerCase().includes(search.toLowerCase());
    const tagMatch =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => note.tags.includes(tag));
    const importantMatch = !importantOnly || note.important;
    return searchMatch && tagMatch && importantMatch;
  });

  const tagsList = getAllTags(notes);

  return (
    <div className="vault-root">
      <Header theme={theme} toggleTheme={handleThemeToggle} />
      <main className="vault-main">
        <NotesToolbar
          search={search}
          setSearch={setSearch}
          allTags={tagsList}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          importantOnly={importantOnly}
          setImportantOnly={setImportantOnly}
        />
        {notes.length === 0 ? (
          <EmptyState onAddNote={handleOpenAdd} />
        ) : filteredNotes.length === 0 ? (
          <div className="empty-state-msg">
            No notes match the current filters.
          </div>
        ) : (
          <NotesList
            notes={filteredNotes}
            onEdit={handleOpenEdit}
            onDelete={handleConfirmDelete}
          />
        )}
      </main>
      <FloatingAddButton onClick={handleOpenAdd} />
      {modalOpen && modalData && (
        <NoteEditorModal
          open={modalOpen}
          onClose={handleCloseModal}
          mode={modalData.mode}
          noteData={modalData.mode === "edit" ? (modalData as Note) : undefined}
          onAdd={handleAddNote}
          onUpdate={handleUpdateNote}
        />
      )}
      {toDeleteId && (
        <ConfirmDialog
          open={!!toDeleteId}
          onCancel={handleCancelDelete}
          onConfirm={() => {
            if (toDeleteId) handleDeleteNote(toDeleteId);
            setToDeleteId(null);
          }}
        >
          Delete this note? This action cannot be undone.
        </ConfirmDialog>
      )}
    </div>
  );
};

export default App;

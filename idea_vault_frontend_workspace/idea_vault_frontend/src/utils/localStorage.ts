/* eslint-disable no-undef */
import { Note } from "../types";

const STORAGE_KEY = "idea-vault-notes";

// PUBLIC_INTERFACE
export function loadNotes(): Note[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export function saveNotes(notes: Note[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // ignore
  }
}

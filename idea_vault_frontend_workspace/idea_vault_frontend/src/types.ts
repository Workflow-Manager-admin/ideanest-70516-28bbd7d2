export interface Note {
  id: string;
  title: string;
  text: string;
  tags: string[];
  important: boolean;
  createdAt: string;
}

export interface NoteEditorData {
  title: string;
  text: string;
  tags: string[];
  important: boolean;
  mode: "add" | "edit";
}

export interface TagOption {
  label: string;
  count: number;
}

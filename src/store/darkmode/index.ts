import { create } from "zustand";

interface IDarkModeState {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
}

export const useDarkMode = create<IDarkModeState>((set) => ({
  mode: "light",
  setMode: (mode) => set({ mode }),
}));

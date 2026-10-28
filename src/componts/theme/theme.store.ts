import { create } from "zustand";
import type { Theme } from "./theme.types";

interface ThemeStore {
	theme: Theme;
	toggle: () => void;
}

const stored = localStorage.getItem("theme");
const initial: Theme =
	stored === "light" || stored === "dark" ? stored : "dark";

export const useThemeStore = create<ThemeStore>((set) => ({
	theme: initial,
	toggle: () =>
		set((s) => {
			const next = s.theme === "light" ? "dark" : "light";
			localStorage.setItem("theme", next);
			return { theme: next };
		}),
}));

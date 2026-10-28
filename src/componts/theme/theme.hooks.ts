import { useEffect } from "react";
import { useThemeStore } from "./theme.store";

export function useTheme() {
	const theme = useThemeStore((s) => s.theme);
	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);
}

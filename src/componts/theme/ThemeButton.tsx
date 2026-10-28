import { Moon, Sun } from "lucide-react";
import IconButton from "../IconButton";
import { useThemeStore } from "./theme.store";

function ThemeButton() {
	const theme = useThemeStore((state) => state.theme);
	const toggleTheme = useThemeStore((state) => state.toggle);

	const icon = theme == "light" ? <Sun /> : <Moon />;
	return <IconButton onClick={toggleTheme}>{icon}</IconButton>;
}

export default ThemeButton;

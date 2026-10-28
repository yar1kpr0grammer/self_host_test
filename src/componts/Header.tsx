import { FolderGit2 } from "lucide-react";
import ThemeButton from "./theme/ThemeButton";

function Header() {
	return (
		<header className="pt-4 px-6 flex justify-center items-center md:justify-start gap-4">
			<h1 className="inline">Shahmatki</h1>
			<a
				className="hidden md:flex md:items-center gap-2"
				href="https://github.com/yar1kpr0grammer/self_host_test"
			>
				<FolderGit2 className="inline" />
				Source
			</a>
			<ThemeButton />
		</header>
	);
}

export default Header;

import Header from "./componts/Header";
import ChessGame from "./componts/chess/ChessGame";
import { useTheme } from "./componts/theme/theme.hooks";

function App() {
	useTheme();

	return (
		<div className="flex h-dvh flex-col overflow-hidden">
			<Header />

			<main className="flex-1 min-h-0 flex flex-col justify-center overflow-hidden">
				<ChessGame />
			</main>
		</div>
	);
}

export default App;

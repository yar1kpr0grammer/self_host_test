import Header from "./componts/Header";
import ChessGame from "./componts/chess/ChessGame";
import { useTheme } from "./componts/theme/theme.hooks";

function App() {
	useTheme();
	return (
		<div className="min-h-screen">
			<Header />
			<main className="flex flex-col justify-center">
				<ChessGame />
			</main>
		</div>
	);
}

export default App;

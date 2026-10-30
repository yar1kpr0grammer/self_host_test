import type { GameControlsProps } from "./chess.types";
import {
	MoveLeft,
	MoveRight,
	RefreshCw,
	ArrowBigRightDash,
} from "lucide-react";
import IconButton from "../IconButton";

export default function GameControls({
	currentIndex,
	totalMoves,
	onNavigate,
	onRestart,
}: GameControlsProps) {
	const isFirst = currentIndex === 0;
	const isLatest = currentIndex === totalMoves;

	return (
		<div className="flex justify-between gap-3 m-6">
			<IconButton
				onClick={() => onNavigate(currentIndex - 1)}
				disabled={isFirst}
			>
				<MoveLeft />
			</IconButton>

			<IconButton
				onClick={() => onNavigate(currentIndex + 1)}
				disabled={isLatest}
			>
				<MoveRight />
			</IconButton>

			<IconButton onClick={() => onNavigate(totalMoves)} disabled={isLatest}>
				<ArrowBigRightDash />
			</IconButton>

			<IconButton onClick={onRestart}>
				<RefreshCw className="active:animate-spin" />
			</IconButton>
		</div>
	);
}

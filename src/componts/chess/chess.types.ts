import type { Square } from "chess.js";

export type PromotionPiece = "q" | "r" | "b" | "n";
export type Color = "w" | "b";

export type MoveRecord = {
	fen: string;
	san: string | null;
	color: Color | null;
	from?: Square;
	to?: Square;
};

export type PendingPromotion = {
	from: Square;
	to: Square;
	color: Color;
};
export type LastMove = {
	from: Square;
	to: Square;
};

export type ChessBoardProps = {
	fen: string;
	selectedSquare: Square | null;
	legalTargets: Square[];
	captureTargets: Square[];
	lastMove: LastMove | null;
	kingInCheckSquare?: Square | null;
	onSquareClick: (square: string) => void;
	onPieceDrop: (sourceSquare: string, targetSquare: string) => boolean;
};

export type MoveHistoryProps = {
	history: MoveRecord[];
	currentIndex: number;
	onMoveClick: (index: number) => void;
};

export type GameControlsProps = {
	currentIndex: number;
	totalMoves: number;
	onNavigate: (index: number) => void;
	onRestart: () => void;
};

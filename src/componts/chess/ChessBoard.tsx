import { Chessboard } from "react-chessboard";
import type { ChessBoardProps } from "./chess.types";

export default function ChessBoard({
  fen,
  selectedSquare,
  legalTargets,
  captureTargets,
  lastMove,
  onSquareClick,
  onPieceDrop,
}: ChessBoardProps) {

  const squareStyles: Record<string, React.CSSProperties> = {};

  if (lastMove) {
    squareStyles[lastMove.from] = {
      backgroundColor: "rgba(255, 235, 59, 0.45)",
    };

    squareStyles[lastMove.to] = {
      backgroundColor: "rgba(255, 235, 59, 0.65)",
    };
  }

  if (selectedSquare) {
    squareStyles[selectedSquare] = {
      ...squareStyles[selectedSquare],
      backgroundColor: "rgba(33, 150, 243, 0.5)",
    };
  }

  for (const square of legalTargets) {
    if (captureTargets.includes(square)) {
      // клетка с фигурой-целью — заливаем целиком красным, без кружка
      squareStyles[square] = {
        ...squareStyles[square],
        backgroundColor: "rgba(220, 38, 38, 0.55)",
      };
    } else {
      // пустая клетка — оставляем зелёный кружок-точку
      squareStyles[square] = {
        ...squareStyles[square],
        background: "radial-gradient(circle, rgba(22, 163, 74, 0.55) 20%, transparent 22%)",
      };
    }
  }

  return (
    <Chessboard
      options={{
        position: fen,
        squareStyles,

        onSquareClick: ({ square }) => {
          console.log("Chessboard click:", square);
          onSquareClick(square);
        },

        onPieceDrop: ({ sourceSquare, targetSquare }) => {
          console.log("Chessboard drop:", sourceSquare, targetSquare);

          if (!targetSquare) return false;

          return onPieceDrop(sourceSquare, targetSquare);
        },
      }}
    />
  );
}

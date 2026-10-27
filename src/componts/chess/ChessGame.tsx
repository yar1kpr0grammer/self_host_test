import { useState } from "react";
import { Chess, type Square } from "chess.js";
import ChessBoard from "./ChessBoard";
import MoveHistory from "./MoveHistory";
import GameControls from "./GameControls";
import type {MoveRecord, PendingPromotion } from "./chess.types";
import PromotionModal from "./PromotionModal";
import type { PromotionPiece } from "./chess.types";
import Toast from "../MessageBox";

function createInitialHistory(): MoveRecord[] {
  return [
    {
      fen: new Chess().fen(),
      san: null,
      color: null,
    },
  ];
}

export default function ChessGame() {
  const [history, setHistory] = useState<MoveRecord[]>(createInitialHistory);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [pendingPromotion, setPendingPromotion] = useState<PendingPromotion | null>(null);
  const [message, setMessage] = useState<string|null>();

  const game = new Chess(history[currentIndex].fen);
  const availableMoves = selectedSquare
    ? game.moves({
        square: selectedSquare,
        verbose: true,
      })
    : [];

  const legalTargets = availableMoves.map((move) => move.to);

  const captureTargets = availableMoves
    .filter((move) => move.isCapture() || move.isEnPassant())
    .map((move) => move.to);


  function makeMove(
    from: Square,
    to: Square,
    promotion?: PromotionPiece
  ): boolean {
    const nextGame = new Chess(history[currentIndex].fen);

    try {
      // Проверяем, является ли выбранный ход превращением пешки
      const candidate = nextGame
        .moves({ square: from, verbose: true })
        .find((move) => move.to === to);

      if (candidate?.promotion && !promotion) {
        setPendingPromotion({
          from,
          to,
          color: nextGame.turn(),
        });

        setSelectedSquare(null);
        setMessage("Выберите фигуру для превращения");
        return false;
      }

      const move = nextGame.move({
        from,
        to,
        ...(promotion ? { promotion } : {}),
      });

      const nextHistory = history.slice(0, currentIndex + 1);

      nextHistory.push({
        fen: nextGame.fen(),
        san: move.san,
        color: move.color,
        from: move.from,
        to: move.to,
      });

      setHistory(nextHistory);
      setCurrentIndex(nextHistory.length - 1);
      setSelectedSquare(null);
      setPendingPromotion(null);

      setMessage(
        nextGame.isCheckmate()
          ? `Мат! ${move.color === "w" ? "Белые" : "Чёрные"} победили`
          : nextGame.isDraw()
            ? "Ничья"
            : nextGame.isCheck()
              ? "Шах!"
              : ""
      );

      return true;
    } catch {
      setMessage("Недопустимый ход");
      return false;
    }
  }

  function handlePromotion(piece: PromotionPiece) {
    if (!pendingPromotion) return;

    makeMove(
      pendingPromotion.from,
      pendingPromotion.to,
      piece
    );
  }

  function handleSquareClick(squareString: string) {
    const square = squareString as Square;
    const piece = game.get(square);

    if (selectedSquare === null) {
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square);
        setMessage(`Выбрана клетка ${square}`);
      }
      return;
    }

    if (selectedSquare === square) {
      setSelectedSquare(null);
      return;
    }

    if (piece && piece.color === game.turn()) {
      setSelectedSquare(square);
      return;
    }

    makeMove(selectedSquare, square);
  }

  function handlePieceDrop(
    sourceSquare: string,
    targetSquare: string
  ): boolean {
    return makeMove(
      sourceSquare as Square,
      targetSquare as Square
    );
  }

  function goTo(index: number) {
    const safeIndex = Math.max(
      0,
      Math.min(index, history.length - 1)
    );

    setPendingPromotion(null);
    setCurrentIndex(safeIndex);
    setSelectedSquare(null);
  }

  function restart() {
    setHistory(createInitialHistory());
    setCurrentIndex(0);
    setSelectedSquare(null);
    setMessage(null);
    setPendingPromotion(null);
  }

  const currentMove = history[currentIndex];

  const lastMove =
    currentMove?.from && currentMove?.to
      ? {
          from: currentMove.from,
          to: currentMove.to,
        }
      : null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "minmax(0, 2fr) minmax(220px, 1fr)",
        gap: 20,
        alignItems: "start",
        maxWidth: 1000,
        width: "100%",
        margin: "0 auto",
      }}
    >
      <section style={{ minWidth: 0 }}>
        {message && <Toast message={message} />}

        <ChessBoard
          fen={history[currentIndex].fen}
          selectedSquare={selectedSquare}
          legalTargets={legalTargets}
          captureTargets={captureTargets}
          lastMove={lastMove}
          onSquareClick={handleSquareClick}
          onPieceDrop={handlePieceDrop}
        />

        <GameControls
          currentIndex={currentIndex}
          totalMoves={history.length - 1}
          onNavigate={goTo}
          onRestart={restart}
        />
      </section>

      <MoveHistory
        history={history}
        currentIndex={currentIndex}
        onMoveClick={goTo}
      />

      {pendingPromotion && (
        <PromotionModal
          color={pendingPromotion.color}
          onSelect={handlePromotion}
        />
      )}

    </div>
  );
}

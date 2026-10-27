
import type { GameControlsProps } from "./chess.types";

export default function GameControls({
  currentIndex,
  totalMoves,
  onNavigate,
  onRestart,
}: GameControlsProps) {
  const isFirst = currentIndex === 0;
  const isLatest = currentIndex === totalMoves;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 12,
      }}
    >

      <button
        onClick={() => onNavigate(currentIndex - 1)}
        disabled={isFirst}
      >
        ← Назад
      </button>

      <button
        onClick={() => onNavigate(currentIndex + 1)}
        disabled={isLatest}
      >
        Вперёд →
      </button>

      <button
        onClick={() => onNavigate(totalMoves)}
        disabled={isLatest}
      >
        ⏭ Сейчас
      </button>

      <button onClick={onRestart}>
        Новая партия
      </button>
    </div>
  );
}

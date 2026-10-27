
import type { MoveHistoryProps } from "./chess.types";

export default function MoveHistory({
  history,
  currentIndex,
  onMoveClick,
}: MoveHistoryProps) {

  const moves = history.slice(1);
  const rowCount = Math.ceil(moves.length / 2);

  return (
    <aside
      style={{
        border: "1px solid #d1d5db",
        borderRadius: 10,
        overflow: "hidden",
        minWidth: 0,
      }}
    >
      <h3
        style={{
          margin: 0,
          padding: 14,
          borderBottom: "1px solid #d1d5db",
        }}
      >
        История ходов
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "40px 1fr 1fr",
          fontWeight: 600,
          padding: "10px 8px",
          background: "#f3f4f6",
        }}
      >
        <span>№</span>
        <span>Белые</span>
        <span>Чёрные</span>
      </div>

      <div style={{ maxHeight: 420, overflowY: "auto" }}>
        {rowCount === 0 && (
          <p style={{ padding: 12, color: "#6b7280" }}>
            Пока нет ходов
          </p>
        )}

        {Array.from({ length: rowCount }, (_, rowIndex) => {
          const whiteIndex = rowIndex * 2 + 1;
          const blackIndex = whiteIndex + 1;


          const whiteMove = history[whiteIndex];
          const blackMove = history[blackIndex];
          return (
            <div
              key={rowIndex}
              style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr 1fr",
                alignItems: "stretch",
                background:
                  rowIndex % 2 === 0 ? "#fff" : "#f9fafb",
              }}
            >
              <span
                style={{
                  padding: "10px 8px",
                  display: "block",
                  color: "black",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {whiteIndex}.
              </span>

              <button
                onClick={() => onMoveClick(whiteIndex)}
                style={moveStyle(currentIndex === whiteIndex)}
              >
                {whiteMove.san}
              </button>

              <button
                disabled={!blackMove}
                onClick={() => onMoveClick(blackIndex)}
                style={moveStyle(currentIndex === blackIndex)}
              >
                {blackMove?.san ?? ""}
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function moveStyle(active: boolean): React.CSSProperties {
  return {
    border: 0,
    padding: 10,
    textAlign: "left",
    cursor: "pointer",
    background: active ? "#fde68a" : "transparent",
    fontWeight: active ? 700 : 400,
  };
}

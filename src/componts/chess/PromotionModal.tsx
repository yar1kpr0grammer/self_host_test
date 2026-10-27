import type { Color, PromotionPiece } from "./chess.types";

type PromotionModalProps = {
  color: Color;
  onSelect: (piece: PromotionPiece) => void;
};

const pieces: {
  value: PromotionPiece;
  name: string;
  white: string;
  black: string;
}[] = [
  { value: "q", name: "Ферзь", white: "♕", black: "♛" },
  { value: "r", name: "Ладья", white: "♖", black: "♜" },
  { value: "b", name: "Слон", white: "♗", black: "♝" },
  { value: "n", name: "Конь", white: "♘", black: "♞" },
];

export default function PromotionModal({
  color,
  onSelect,
}: PromotionModalProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0, 0, 0, 0.65)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="promotion-title"
        style={{
          width: "100%",
          maxWidth: 360,
          background: "#fff",
          color: "#111827",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <h2 id="promotion-title" style={{ marginTop: 0 }}>
          Превращение пешки
        </h2>

        <p>Выберите фигуру для превращения</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 8,
            marginTop: 20,
          }}
        >
          {pieces.map((piece) => (
            <button
              key={piece.value}
              type="button"
              onClick={() => onSelect(piece.value)}
              aria-label={piece.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                padding: "12px 4px",
                border: "1px solid #d1d5db",
                borderRadius: 10,
                background: "#f9fafb",
                color: "#111827",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  fontSize: 48,
                  lineHeight: 1,
                  fontFamily: "serif",
                }}
              >
                {color === "w" ? piece.white : piece.black}
              </span>

              <span style={{ fontSize: 12 }}>
                {piece.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

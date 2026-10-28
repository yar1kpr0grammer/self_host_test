import type { MoveHistoryProps } from "../chess.types";
import MoveButton from "./MoveButton";

export default function MoveHistory({
	history,
	currentIndex,
	onMoveClick,
}: MoveHistoryProps) {
	const moves = history.slice(1);
	const rowCount = Math.ceil(moves.length / 2);

	return rowCount === 0 ? (
		<div className="flex items-center justify-center h-full">
			<p>Пока нет ходов</p>
		</div>
	) : (
		<table className="table-fixed ">
			<colgroup>
				<col className="w-10" />
				<col />
				<col />
			</colgroup>
			<thead>
				<tr>
					<td className="text-center font-bold">№</td>
					<td className="text-center font-bold">Белые</td>
					<td className="text-center font-bold">Чёрные</td>
				</tr>
			</thead>

			<tbody>
				{Array.from({ length: rowCount }, (_, rowIndex) => {
					const whiteIndex = rowIndex * 2 + 1;
					const blackIndex = whiteIndex + 1;

					const whiteMove = history[whiteIndex];
					const blackMove = history[blackIndex];
					return (
						<tr>
							<td className="font-bold self-center max-w-2.5 text-center">
								{rowIndex + 1}
							</td>

							<MoveButton
								onClick={() => onMoveClick(whiteIndex)}
								active={currentIndex === whiteIndex}
							>
								{whiteMove.san}
							</MoveButton>

							<MoveButton
								disabled={!blackMove}
								onClick={() => onMoveClick(blackIndex)}
								active={currentIndex === blackIndex}
							>
								{blackMove?.san ?? ""}
							</MoveButton>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

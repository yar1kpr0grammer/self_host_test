import type { ReactNode } from "react";

interface MoveButtonProps {
	children: ReactNode;
	onClick: () => void;
	disabled?: boolean;
	active: boolean;
}

function MoveButton({ children, onClick, disabled, active }: MoveButtonProps) {
	return (
		<td>
			{children && (
				<button
					className={`shadow-none! border w-full ${active ? "text-active-text! bg-active! font-bold" : "bg-transparent!"}`}
					onClick={onClick}
					disabled={disabled}
				>
					{children}
				</button>
			)}
		</td>
	);
}

export default MoveButton;

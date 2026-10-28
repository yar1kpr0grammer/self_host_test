import type { ReactNode } from "react";

interface IconButtonProps {
	children: ReactNode;
	onClick: () => void;
	title?: string;
	disabled?: boolean;
}

function IconButton({
	children,
	title: tip,
	onClick,
	disabled,
}: IconButtonProps) {
	return (
		<button onClick={onClick} disabled={disabled} title={tip}>
			{children}
		</button>
	);
}

export default IconButton;

import type { ReactNode } from "react";

interface IconButtonProps {
	children: ReactNode;
	onClick: () => void;
	title?: string;
	disabled?: boolean;
	className?: string;
}

function IconButton({
	children,
	title: tip,
	onClick,
	disabled,
	className,
}: IconButtonProps) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			title={tip}
			className={className}
		>
			{children}
		</button>
	);
}

export default IconButton;

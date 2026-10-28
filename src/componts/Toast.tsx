import { useEffect } from "react";

interface MessageBoxProps {
	message: string;
	onClose?: () => void;
	duration?: number; // мс, по умолчанию 3000
}

function Toast({ message, onClose, duration = 3000 }: MessageBoxProps) {
	useEffect(() => {
		if (!onClose) return;
		const id = setTimeout(onClose, duration);
		return () => clearTimeout(id);
	}, [message, onClose, duration]); // message в deps — чтобы таймер перезапускался при новом сообщении

	return (
		<div className="bg-background absolute z-20 bottom-2 left-1/2 -translate-x-1/2 max-w-2xs border border-neutral-700 py-4 px-8 rounded-full">
			{message}
		</div>
	);
}

export default Toast;

import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialvalue: T) {
	const [value, setValue] = useState<T>(() => {
		const stored = localStorage.getItem(key);

		if (stored === null) {
			return initialvalue;
		}

		try {
			return JSON.parse(stored) as T;
		} catch {
			return initialvalue;
		}
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, setValue]);

	return [value, setValue] as const;
}

export default useLocalStorage;

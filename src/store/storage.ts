export function loadState<T>(key: string): T | undefined {
	if (typeof window === 'undefined') {
		return undefined;
	}

	const jsonState = localStorage.getItem(key);
	if (!jsonState) {
		return undefined;
	}

	try {
		return JSON.parse(jsonState) as T;
	} catch {
		return jsonState as T;
	}
} 

export function saveState<T>(key: string, state: T): void {
	const stringState = JSON.stringify(state);
	localStorage.setItem(key, stringState);
}
export function getTokenLocalStorage(): string | null {
	return localStorage.getItem('token')
}

export function saveTokenLocalStorage(key: string, token: string): void {
	localStorage.setItem(key, token)
}

export function removeTokenLocalStorage(key: string): void {
	localStorage.removeItem(key)
}

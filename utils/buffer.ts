export function arrayBufferToBase64(buffer: ArrayBuffer): string {
	let binary = "";
	const bytes = new Uint8Array(buffer);
	for (const byte of bytes) {
		binary += String.fromCharCode(byte);
	}
	return btoa(binary);
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
	const binary = atob(base64);
	const length = binary.length;
	const buffer = new Uint8Array(length);
	for (let i = 0; i < length; i++) {
		buffer[i] = binary.charCodeAt(i);
	}
	return buffer.buffer;
}

export function handleAsync<T, E = Error>(promise: Promise<T>) {
	return promise
		.then<[null, T]>((data: T) => [null, data])
		.catch<[E, undefined]>((error: E) => [error, undefined]);
}

export type SetAction<S extends Record<string, any>, K extends keyof S> = (
	payload: S[K],
) => void;

export type SetPartialAction<S extends Record<string, any>> = (
	payload: Partial<S>,
) => void;

export type VoidAction = () => void;

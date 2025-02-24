"use client";

type ErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

export default function ({ error, reset }: ErrorProps) {
	return (
		<div>
			<h2>Something went wrong!</h2>
			<button onClick={reset}>Try again</button>
		</div>
	);
}

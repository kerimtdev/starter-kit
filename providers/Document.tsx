type DocumentProps = React.PropsWithChildren;

function Document({ children }: DocumentProps) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}

export default Document;

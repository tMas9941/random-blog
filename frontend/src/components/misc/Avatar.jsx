export default function Avatar({ text = "X", size = 80, color = "green" }) {
	const firstLetter = text[0].toUpperCase();
	return (
		<div
			style={{
				minWidth: size,
				minHeight: size,
				width: size,
				height: size,
				backgroundColor: color,
				borderWidth: size * 0.05,
			}}
			className="relative flex items-center justify-center   rounded-full  overflow-hidden"
		>
			<span style={{ fontSize: size * 1.2, marginBottom: size * 0.2 }} className="font-semibold text-n-text">
				{firstLetter}
			</span>
		</div>
	);
}

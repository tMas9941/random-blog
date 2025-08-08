export default function Avatar({ text, size = 80, color = "green" }) {
	const firstLetter = text[0].toUpperCase();
	return (
		<div
			style={{ minWidth: size, minHeight: size, height: size, backgroundColor: color, borderWidth: size * 0.05 }}
			className="relative flex items-center justify-center   rounded-full  overflow-hidden"
		>
			<span style={{ fontSize: size * 1.3, marginBottom: size * 0.3 }} className="font-bold text-n-text">
				{firstLetter}
			</span>
		</div>
	);
}

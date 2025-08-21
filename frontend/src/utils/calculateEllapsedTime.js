export default function calculateElapsedTime(time) {
	if (time < 1000) return "now";
	const newTime = (divider) => Math.floor(time / divider);

	let times = {
		year: newTime(1000 * 60 * 60 * 24 * 365),
		month: newTime(1000 * 60 * 60 * 24 * 30),
		day: newTime(1000 * 60 * 60 * 24),
		hour: newTime(1000 * 60 * 60),
		min: newTime(1000 * 60),
		sec: newTime(1000),
	};
	let result = Object.entries(times).find((element) => element[1] > 0);

	if (result[1] > 1) {
		result[0] += "s";
	}

	return `${result[1]} ${result[0]}`;
}

const TIME_IN_MS = {
	year: 31536000000,
	month: 2592000000,
	hour: 3600000,
	day: 86400000,
	min: 60000,
	sec: 1000,
};

export default function calculateElapsedTime(time) {
	if (time < 1000) return "now";

	const newTime = (divider) => Math.floor(time / divider);

	let times = {
		year: newTime(TIME_IN_MS.year),
		month: newTime(TIME_IN_MS.month),
		day: newTime(TIME_IN_MS.day),
		hour: newTime(TIME_IN_MS.hour),
		min: newTime(TIME_IN_MS.min),
		sec: newTime(TIME_IN_MS.sec),
	};
	let result = Object.entries(times).find((element) => element[1] > 0);

	if (result[1] > 1) {
		result[0] += "s";
	}

	return `${result[1]} ${result[0]}`;
}

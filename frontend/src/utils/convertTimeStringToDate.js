const formatDate = new Intl.DateTimeFormat("hu", {
	timeZone: "CET",
	year: "numeric",
	month: "short",
	day: "numeric",
});
const formatTime = new Intl.DateTimeFormat("hu", {
	timeZone: "CET",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
});

// convert string date to Date
// returns the date and time separated
export default function convertTimeStringToDate(timeStr) {
	return { date: formatDate.format(new Date(timeStr)), time: formatTime.format(new Date(timeStr)) };
}

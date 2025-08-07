const formatDate = new Intl.DateTimeFormat("hu", {
	timeZone: "CET",
	year: "numeric",
	month: "numeric",
	day: "numeric",
});
const formatTime = new Intl.DateTimeFormat("hu", {
	timeZone: "CET",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
});

export default function convertTimeStringToDate(timeStr) {
	// convert string date to Date
	// returns the date and time separated
	return { date: formatDate.format(new Date(timeStr)), time: formatTime.format(new Date(timeStr)) };
}

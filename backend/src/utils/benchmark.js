export default function benchmark(name, printStart = false) {
	const start = new Date();
	if (printStart) console.log(name, "started...");
	return {
		stop: function () {
			const time = new Date().getTime() - start.getTime();
			console.log(name, "finished in", time, "ms");
		},
	};
}

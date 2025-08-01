import React from "react";

export default function ListItem({ data }) {
	console.log("data ", data);
	if (!data) return <></>;
	return (
		<div className="w-full py-5 flex gap-10">
			<div>
				<h3 className=" font-semibold">{data.author.username}</h3>
				<p> {convertTime(data.created).date}</p>
				<p> {convertTime(data.created).time}</p>
			</div>
			<div>
				<h2 className="text-2xl font-semibold">{data.title}</h2>
				<p>{data.content}</p>
			</div>
		</div>
	);
}

function convertTime(timeStr) {
	const time = timeStr.split(".")[0].split("T");
	return { date: time[0], time: time[1] };
}

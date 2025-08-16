import React from "react";

import Avatar from "../misc/Avatar";

export default function CommentItem({ data }) {
	if (!data) return <></>;

	const timePassed = calculateElapsedTime(new Date() - new Date(data.created));

	return (
		<div className="flex gap-5 p-3">
			<div className="flex min-w-max [&_div]:m-2 ">
				<Avatar text={data.user.username} size={40} />
			</div>
			<div className="">
				<div className="flex gap-2">
					<h3 className="font-semibold">{data.user.username}</h3>
					<p className="mt-auto font-italic text-sm text-[gray]/50"> {timePassed}</p>
				</div>
				<p>{data.content}</p>
			</div>
		</div>
	);
}

function calculateElapsedTime(time) {
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
	if (result[0] === "sec") {
		result = ["now", ""];
	} else if (result[1] > 1) {
		result[0] += "s";
	}
	return `${result[1]} ${result[0]}`;
}

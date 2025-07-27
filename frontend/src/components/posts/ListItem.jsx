import React from "react";

export default function ListItem({ data }) {
	return (
		<div className="w-full py-5">
			<h1 className="text-2xl font-semibold">{data.title}</h1>
			<p>{data.content}</p>
		</div>
	);
}

import React from "react";
import { userSignal } from "../global/userData";
import AvatarSection from "../components/misc/AvatarSection";
import UploadAndDisplayImage from "../components/misc/UploadAndDisplayImage";
import calculateElapsedTime from "../utils/calculateEllapsedTime";
import convertTimeStringToDate from "../utils/convertTimeStringToDate";

export default function Settings() {
	return (
		<div className="[&>h2]:text-3xl [&>h2]:font-semibold [&>h1]:mb-10 [&>h2]:mb-10 [&_h3]:mb-5 [&_h3]:text-2xl [&>h2]:border-b [&>h2]:border-secondary/60">
			<h1>Settings</h1>
			<Account />
			<Password />
			<Profile />
		</div>
	);
}

function Account() {
	return (
		<>
			<h2>Account</h2>
		</>
	);
}
function Password() {
	return (
		<>
			<h2>Password</h2>
		</>
	);
}
function Profile() {
	const user = userSignal.value;
	const created = convertTimeStringToDate(user.created);
	const daysDifference = calculateElapsedTime(new Date() - new Date(user.created));
	return (
		<>
			<h2>Profile</h2>
			<div className="flex gap-10 [&_p]:text-xl">
				<UploadAndDisplayImage />
				<div className="flex gap-5">
					<div>
						<h2 className="text-3xl font-bold">{user.username}</h2>

						<p className="font-md truncate">
							{created.date}
							<span className="text-[gray] "> - {daysDifference}</span>
						</p>
						<p>{user.email}</p>
					</div>
				</div>
			</div>
		</>
	);
}

import React from "react";
import useSignal from "../hooks/useSignal";
import { userSignal } from "../global/userData";
import convertTimeStringToDate from "../utils/convertTimeStringToDate";
import Avatar from "../components/misc/Avatar";
import ProfileMenuButton from "../components/profile/ProfileMenuButton";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Profile() {
	const user = useSignal(userSignal, "profilePage");

	return (
		<div className="flex flex col gap-20">
			<ProfileSide user={user} />
			<ActivitySide user={user} />
		</div>
	);
}

function ProfileSide({ user }) {
	const created = convertTimeStringToDate(user.created);
	let daysDifference = Math.ceil((new Date() - new Date(user.created)) / (1000 * 3600 * 24));
	return (
		<div>
			<h1 className="mb-10">Profile</h1>
			<div className="flex">
				<div className="flex gap-5">
					<Avatar text={user.username} />
					<div>
						<h2 className="text-xl font-bold">{user.username}</h2>

						<p className="font-md truncate">
							{created.date}
							<span className="text-[gray] "> - {daysDifference} days</span>
						</p>
						<p>{user.email}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function ActivitySide({ user }) {
	const location = useLocation();
	const navigate = useNavigate();
	return (
		<div className="w-full ">
			<div className="flex h-12 w-full border-b border-background/40">
				<ProfileMenuButton text={"posts"} location={location} onClick={() => navigate("/profile/posts")} />
				<ProfileMenuButton text={"upvotes"} location={location} onClick={() => navigate("/profile/upvotes")} />
				<ProfileMenuButton text={"comments"} location={location} onClick={() => navigate("/profile/comments")} />
			</div>
			<Outlet />
		</div>
	);
}

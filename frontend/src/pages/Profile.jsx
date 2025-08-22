import React from "react";
import useSignal from "../hooks/useSignal";
import { userSignal } from "../global/userData";
import convertTimeStringToDate from "../utils/convertTimeStringToDate";
import Avatar from "../components/misc/Avatar";
import ProfileMenuButton from "../components/profile/ProfileMenuButton";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AvatarSection from "../components/misc/AvatarSection";

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
	return (
		<div>
			<h1 className="mb-10">Profile</h1>
			<div className="flex flex-col gap-5 w-80">
				<AvatarSection user={user} />
				<p className="">{user.profile?.introduction}</p>
			</div>
		</div>
	);
}

function ActivitySide({ user }) {
	const location = useLocation();
	const navigate = useNavigate();
	return (
		<div className="w-full ">
			<div className="flex h-12 w-full border-b border-secondary/60">
				<ProfileMenuButton text={"posts"} location={location} onClick={() => navigate("/profile/posts")} />
				<ProfileMenuButton text={"upvotes"} location={location} onClick={() => navigate("/profile/upvotes")} />
				<ProfileMenuButton text={"comments"} location={location} onClick={() => navigate("/profile/comments")} />
			</div>
			<Outlet />
		</div>
	);
}

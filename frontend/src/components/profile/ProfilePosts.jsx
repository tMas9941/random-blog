import React from "react";
import PostsList from "../posts/PostsList";
import { userSignal } from "../../global/userData";

export default function ProfilePosts() {
	return (
		<>
			<PostsList where={{ userId: userSignal.value.id }} user={userSignal.value} />
		</>
	);
}

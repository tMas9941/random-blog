import React from "react";
import { userSignal } from "../../global/userData";
import PostsList from "../posts/PostsList";

export default function ProfileComments() {
	return (
		<>
			<PostsList where={{ comments: { some: { userId: userSignal.value.id } } }} user={userSignal.value} />
		</>
	);
}

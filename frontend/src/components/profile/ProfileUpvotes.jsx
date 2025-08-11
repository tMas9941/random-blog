import React from "react";
import PostsList from "../posts/PostsList";
import { userSignal } from "../../global/userData";

export default function ProfileUpvotes() {
	return (
		<>
			<PostsList where={{ votes: { some: { userId: userSignal.value.id } } }} />
		</>
	);
}

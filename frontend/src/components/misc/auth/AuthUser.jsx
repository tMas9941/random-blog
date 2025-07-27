import React from "react";
import { userSignal } from "../../../global/userData";
import useSignal from "../../../hooks/useSignal";

export default function AuthUser({ component }) {
	const user = useSignal(userSignal, "authUserComponent");
	if (!user) return <div>You need to login to access this page.</div>;
	return component;
}

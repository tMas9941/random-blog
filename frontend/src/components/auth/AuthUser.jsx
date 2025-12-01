import React from "react";
import { userSignal } from "../../global/userData";
import useSignalState from "../../hooks/useSignalState";

export default function AuthUser({ component }) {
    const user = useSignalState(userSignal, "authUserComponent");
    if (!user) return <div>You need to login to access this page.</div>;
    return component;
}

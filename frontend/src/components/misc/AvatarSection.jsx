import calculateElapsedTime from "../../utils/calculateEllapsedTime";
import convertTimeStringToDate from "../../utils/convertTimeStringToDate";
import Avatar from "./Avatar";
import React from "react";

export default function AvatarSection({ user }) {
    if (!user.created) return <></>;

    const created = convertTimeStringToDate(user.created);
    const daysDifference = calculateElapsedTime(new Date() - new Date(user.created));
    return (
        <div className="flex gap-5">
            <Avatar text={user.username} url={user.profile.avatarUrl} />
            <div>
                <h2 className="text-xl font-bold">{user.username}</h2>

                <p className="font-md truncate">
                    {created.date}
                    <span className="text-[gray] "> - {daysDifference}</span>
                </p>
                <p>{user.email}</p>
            </div>
        </div>
    );
}

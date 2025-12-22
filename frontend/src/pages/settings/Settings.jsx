import ProfileMenuButton from "../../components/profile/ProfileMenuButton";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Settings() {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div className="[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mb-2  [&>h1]:mb-4">
            <h1>Settings</h1>

            <div className="flex h-12 w-full border-b border-secondary/60 mb-5">
                <ProfileMenuButton text={"account"} location={location} onClick={() => navigate("/settings/account")} />
                <ProfileMenuButton
                    text={"password"}
                    location={location}
                    onClick={() => navigate("/settings/password")}
                />
                <ProfileMenuButton text={"profile"} location={location} onClick={() => navigate("/settings/profile")} />
            </div>
            <Outlet />
        </div>
    );
}

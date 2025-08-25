import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Signal
import useSignal from "../../hooks/useSignal";
import { Logout, userSignal } from "../../global/userData";

// Components
import HeaderButton from "../buttons/HeaderButton";
import UserMenuButton from "../buttons/UserMenuButton";
import useUserMenu from "../../hooks/useUserMenu";
import DarkModeSwitch from "../buttons/DarkModeSwitch";
import ColorButton from "../buttons/ColorButton";
import SvgComponent from "../misc/SvgComponent";
import DropDownButton, { DropDownItem } from "../buttons/dropdown/DropDownButton";
import PopupWindow from "../popup/PopupWindow";

// Forms
import RegistrationForm from "../auth/RegistrationForm";
import LoginForm from "../auth/LoginForm";

export default function Header() {
	return (
		<nav className="z-10 fixed h-13 bg-text text-n-text w-full border-b border-background/40">
			<div className="flex h-full max-w-[1500px] px-10 mx-auto flex justify-between items-center gap-1 ">
				<LeftSide />
				<RightSide />
			</div>
		</nav>
	);
}

function LeftSide() {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<div className="flex h-full items-center">
			<SvgComponent name={"logo"} onClick={() => navigate("/home")} className={"me-10"} />
			<HeaderButton text={"Home"} onClick={() => navigate("/home")} location={location} />
			<HeaderButton text={"Posts"} onClick={() => navigate("/posts")} location={location} />
			<HeaderButton text={"Profile"} onClick={() => navigate("/profile")} location={location} />
		</div>
	);
}

function RightSide() {
	const navigate = useNavigate();
	const user = useSignal(userSignal, "header");
	const userMenu = useUserMenu();

	return (
		<div className="relative h-full flex items-center pe-3 gap-5 ">
			{user && (
				<DropDownButton text={user.username} avatar={true} url={user.profile.avatarUrl}>
					<DropDownItem text={"Profile"} onClick={() => navigate("/profile")} />
					<DropDownItem text={"Settings"} onClick={() => navigate("/settings")} />
					<DropDownItem text={"Log out"} onClick={Logout} />
				</DropDownButton>
			)}
			{!user && <UserMenuButton text={"login"} userMenu={userMenu} />}
			{!user && <UserMenuButton text={"registration"} userMenu={userMenu} />}
			{user && (
				<ColorButton onClick={() => navigate("/posts/create")} className="rounded-full">
					Post
					<SvgComponent name={"pen"} size={20} className={"ms-3 fill-white"} />
				</ColorButton>
			)}
			<DarkModeSwitch />
			<PopupWindow popupComponent={<RegistrationForm />} userMenu={userMenu} text={"registration"} />
			<PopupWindow popupComponent={<LoginForm />} userMenu={userMenu} text={"login"} />
		</div>
	);
}

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Components
import HeaderButton from "../buttons/HeaderButton";
import UserMenuButton from "../buttons/UserMenuButton";
import RegistrationForm from "../auth/RegistrationForm";
import LoginForm from "../auth/LoginForm";

// Signal
import useSignal from "../../hooks/useSignal";
import { Logout, userSignal } from "../../global/userData";
import Button from "../buttons/Button";
import PopupWindow from "../popup/PopupWindow";
import useUserMenu from "../../hooks/useUserMenu";
import DarkModeSwitch from "../buttons/DarkModeSwitch";

export default function Header() {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<nav className="fixed h-13 bg-text text-n-text w-full border-b border-background/40">
			{/* LEFT SIDE */}
			<div className="flex h-full max-w-[1500px] px-10 mx-auto flex justify-between items-center gap-1 ">
				<div className="flex h-full items-center">
					<div className="block me-5">
						<svg height={50} width="70" fill="white" onClick={() => navigate("/home")} className="cursor-pointer">
							<text x="7" y="16" fontSize={13} fontWeight="bold">
								RaNDoM
							</text>
							<text x="5" y="40" fontSize={26} fontWeight="bold">
								BloG
							</text>
						</svg>
					</div>
					<HeaderButton text={"Home"} onClick={() => navigate("/home")} location={location} />
					<HeaderButton text={"Posts"} onClick={() => navigate("/posts")} location={location} />
					<HeaderButton text={"Profile"} onClick={() => navigate("/profile")} location={location} />
				</div>
				{/* RIGHT SIDE */}
				<UserMenu />
			</div>
		</nav>
	);
}

function UserMenu() {
	const user = useSignal(userSignal, "header");
	const userMenu = useUserMenu();

	return (
		<div className="relative flex  items-center pe-3 gap-5">
			{/* TODO add user dropdown button with logout, edit prfile, etc... */}
			{user && <Button text={user?.username} onClick={() => Logout()} />}
			{!user && <UserMenuButton text={"login"} onClick={userMenu.set} />}
			{!user && <UserMenuButton text={"registration"} onClick={userMenu.set} />}
			<DarkModeSwitch />
			<PopupWindow popupComponent={<LoginForm />} userMenu={userMenu} text={"login"} />
			<PopupWindow popupComponent={<RegistrationForm />} userMenu={userMenu} text={"registration"} />
		</div>
	);
}

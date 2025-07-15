import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Components
import HeaderButton from "../buttons/HeaderButton";
import DropDownButton from "../buttons/DropDownButton";
import RegistrationForm from "../auth/RegistrationForm";
import LoginForm from "../auth/LoginForm";

// Signal
import useSignal from "../../hooks/useSignal";
import { userSignal } from "../../global/userData";
import Button from "../buttons/Button";

export default function Header() {
	const user = useSignal(userSignal, "header");
	console.log("user HEADER : ", user);
	const navigate = useNavigate();
	const location = useLocation();
	return (
		<nav className="fixed h-12 bg-text text-n-text w-full flex justify-between items-center gap-1 ">
			<div className="flex">
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
				<HeaderButton text={"Forum"} onClick={() => navigate("/forum")} location={location} />
				<HeaderButton text={"Profile"} onClick={() => navigate("/profile")} location={location} />
			</div>

			<div className="relative flex px-3">
				<Button text={user.username} />
				<DropDownButton text={"log in"} dropDownComponent={<LoginForm />} />
				<DropDownButton text={"registration"} dropDownComponent={<RegistrationForm />} />
			</div>
		</nav>
	);
}

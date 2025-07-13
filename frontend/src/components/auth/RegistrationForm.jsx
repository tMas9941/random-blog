import React, { useRef, useState } from "react";
import Button from "../buttons/Button";
import authService from "../../services/auth.service.js";
import Loader from "../misc/loader/Loader.jsx";

export default function RegistrationForm({ close }) {
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [fetchResult, setFetchResult] = useState(null);
	const [data2, setData] = useState();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.target).entries());

		setButtonDisabled(true);
		let success = await authService.registration(data);

		let token;
		if (success) {
			token = await authService.login(data);
			setFetchResult(true);
		}
		setTimeout(() => {
			setButtonDisabled(false);
			close();
		}, 1000);

		console.log("finished ", success, token, data2, close);
	};
	console.log("render FORM");
	return (
		<div className="text-text min-h-10 min-w-80 p-3">
			<h2 className="text-4xl font-bold mb-5">Registration</h2>

			<form
				className={
					"relative [&>input]:border [&>input]:border-secondary [&>input]:rounded flex flex-col gap-2 " +
					(buttonDisabled && " [&>input]:opacity-0 [&>label]:opacity-0 [&>div]:opacity-100")
				}
				onSubmit={handleSubmit}
			>
				{buttonDisabled && (
					<div className="absolute w-full h-full flex justify-center items-center">
						<Loader className={"round-loader !text-primary scale-150"}></Loader>
					</div>
				)}
				
				<label>Username:</label>
				<input type="text" name="username"></input>
				<label>Email:</label>
				<input type="text" name="email"></input>
				<label>Password:</label>
				<input type="text" name="password"></input>
				<label>Password again:</label>
				<input type="text" name="password_again"></input>
				<Button
					disabled={buttonDisabled}
					text={"Create an account"}
					type={"submit"}
					className={"mt-5 min-h-10 bg-primary text-n-text rounded"}
				></Button>
			</form>
		</div>
	);
}

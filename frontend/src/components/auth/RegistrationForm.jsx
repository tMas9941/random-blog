import React, { useReducer } from "react";
import { REG_STATES, registrationReducer } from "../../hooks/reducers/regReducer.js";
import { Registration } from "../../global/userData.js";

// Components
import Button from "../buttons/Button";
import Loader from "../misc/loader/Loader.jsx";
import SvgComponent from "../misc/SvgComponent.jsx";

export default function RegistrationForm({ close }) {
	const [state, dispatch] = useReducer(registrationReducer, REG_STATES.INIT);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.target).entries());
		dispatch({ newState: REG_STATES.FETCH_START });
		try {
			await Registration(data);
			dispatch({ newState: REG_STATES.FETCH_SUCCESS });
			setTimeout(() => close(), 1100);
		} catch (error) {
			dispatch({ newState: REG_STATES.FETCH_FAILED });
		}

		setTimeout(() => dispatch({ newState: REG_STATES.INIT }), 1300);
	};
	console.log("render FORM");
	return (
		<div className="text-text min-h-10 min-w-80 p-3">
			<form
				className={
					"relative [&>input]:border [&>input]:border-secondary [&>input]:rounded flex flex-col gap-2 " +
					(state.lockForm && " [&>input]:opacity-0 [&>label]:opacity-0 [&>div]:opacity-100 pointer-events-none")
				}
				onSubmit={handleSubmit}
			>
				<h2 className="text-4xl font-bold mb-5">Registration</h2>
				<StatusMsg state={state} />

				<label>Username:</label>
				<input type="text" name="username"></input>
				<label>Email:</label>
				<input type="text" name="email"></input>
				<label>Password:</label>
				<input type="text" name="password"></input>
				<label>Password again:</label>
				<input type="text" name="password_again"></input>
				<Button
					disabled={state.lockForm}
					text={"Create an account"}
					type={"submit"}
					className={"mt-5 min-h-10 bg-primary text-n-text rounded"}
				></Button>
			</form>
		</div>
	);
}

function StatusMsg({ state }) {
	return (
		state.lockForm && (
			<>
				<div className="absolute w-full h-full flex flex-col justify-center items-center">
					{state.loading ? (
						<Loader className={"round-loader !text-primary scale-150"}></Loader>
					) : (
						<SvgComponent name={state.fetchStatus ? "success" : "failed"} size={150} />
					)}
					<p className="text-xl">{state.message}</p>
				</div>
			</>
		)
	);
}

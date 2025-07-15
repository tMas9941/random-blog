import React, { useReducer } from "react";
import { REG_STATES, registrationReducer } from "../../hooks/reducers/regReducer.js";
import { Registration } from "../../global/userData.js";
import { Form, Formik } from "formik";

// Components
import Button from "../buttons/Button";
import AuthStatusMsg from "./AuthStatusMsg.jsx";
import FormField from "../misc/FormField.jsx";
import registrationValidation from "../../validations/registrationValidation.js";

export default function RegistrationForm({ close }) {
	const [state, dispatch] = useReducer(registrationReducer, REG_STATES.INIT);

	const handleSubmit = async (data) => {
		dispatch({ newState: REG_STATES.FETCH_START });
		try {
			await Registration(data);
			dispatch({ newState: REG_STATES.FETCH_SUCCESS });
			setTimeout(() => close(), 1100);
		} catch (error) {
			dispatch({ newState: REG_STATES.FETCH_FAILED, addValue: { message: error.error } });
		}

		setTimeout(() => dispatch({ newState: REG_STATES.INIT }), 1300);
	};

	return (
		<div className="relative text-text min-h-10 min-w-80 ">
			<AuthStatusMsg state={state} />
			<Formik
				initialValues={{ username: "", email: "", password: "", passwordAgain: "" }}
				validationSchema={registrationValidation}
				onSubmit={handleSubmit}
			>
				<Form
					className={
						"relative p-3 [&>input]:border [&>input]:border-secondary [&>input]:rounded flex flex-col gap-2 " +
						(state.lockForm && " [&>div]:opacity-0 pointer-events-none")
					}
				>
					<h2 className="text-4xl font-bold mb-5">Registration</h2>
					<FormField name="username" type="text" />
					<FormField name="email" type="text" />
					<FormField name="password" type="password" />
					<FormField text="password again" name="passwordAgain" type="password" />
					<Button
						disabled={state.lockForm}
						text={"Create account"}
						type={"submit"}
						className={"mt-5 min-h-10 bg-primary text-n-text rounded"}
					></Button>
				</Form>
			</Formik>

			{/* <form
				className={
					"relative [&>input]:border [&>input]:border-secondary [&>input]:rounded flex flex-col gap-2 " +
					(state.lockForm && " [&>input]:opacity-0 [&>label]:opacity-0 [&>div]:opacity-100 pointer-events-none")
				}
				onSubmit={handleSubmit}
			>
				<h2 className="text-4xl font-bold mb-5">Registration</h2>
				<AuthStatusMsg state={state} />

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
			</form> */}
		</div>
	);
}

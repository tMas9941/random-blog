import React, { useReducer } from "react";

import { LOGIN_STATES, loginReducer } from "../../hooks/reducers/loginReducer.js";
import { Form, Formik } from "formik";

// Components
import Button from "../buttons/Button.jsx";
import { Login } from "../../global/userData.js";
import FormStatusMsg from "./FormStatusMsg.jsx";
import loginValidation from "../../validations/loginValidation.js";
import FormField from "../misc/FormField.jsx";

export default function LoginForm({ close }) {
	const [state, dispatch] = useReducer(loginReducer, LOGIN_STATES.INIT);

	const handleSubmit = async (data, { resetForm }) => {
		dispatch({ newState: LOGIN_STATES.FETCH_START });

		try {
			await Login(data);
			dispatch({ newState: LOGIN_STATES.FETCH_SUCCESS });
			setTimeout(() => {
				close();
				resetForm();
			}, 700);
		} catch (error) {
			dispatch({
				newState: LOGIN_STATES.FETCH_FAILED,
				addValue: { message: error?.message },
			});
		}

		setTimeout(() => dispatch({ newState: LOGIN_STATES.INIT }), 1000);
	};

	return (
		<div className="relative bg-inherit text-inherit min-h-10 min-w-80">
			<FormStatusMsg state={state} />

			<Formik initialValues={{ username: "", password: "" }} validationSchema={loginValidation} onSubmit={handleSubmit}>
				<Form
					className={
						"relative p-3 [&>input]:border [&>input]:border-secondary [&>input]:rounded flex flex-col gap-2 " +
						(state.lockForm && " [&>div]:opacity-0 pointer-events-none")
					}
				>
					<h2 className="text-4xl font-bold mb-5">Log in</h2>
					<FormField name="username" type="text" />
					<FormField name="password" type="password" />
					<Button
						disabled={state.lockForm}
						text={"Log in"}
						type={"submit"}
						className={"mt-5 min-h-10 bg-primary text-n-text rounded"}
					></Button>
				</Form>
			</Formik>
		</div>
	);
}

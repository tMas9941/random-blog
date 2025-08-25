import React, { useReducer } from "react";
import { REG_STATES, registrationReducer } from "../../hooks/reducers/regReducer.js";
import { Registration } from "../../global/userData.js";
import { Form, Formik } from "formik";

// Components
import Button from "../buttons/Button";
import FormStatusMsg from "./FormStatusMsg.jsx";
import FormField from "../misc/FormField.jsx";
import registrationValidation from "../../validations/registrationValidation.js";

const MSG_TIMEOUT = 1300;
export default function RegistrationForm({ closePopup }) {
	const [state, dispatch] = useReducer(registrationReducer, REG_STATES.INIT); // handle popup msg and form data

	const handleSubmit = async (data, { resetForm }) => {
		try {
			await attemptRegistration(data, resetForm);
		} catch (error) {
			dispatch({ newState: REG_STATES.FETCH_FAILED, addValue: { message: error?.message } });
		} finally {
			setTimeout(() => dispatch({ newState: REG_STATES.INIT }), MSG_TIMEOUT);
		}
	};

	async function attemptRegistration(data, resetForm) {
		dispatch({ newState: REG_STATES.FETCH_START });
		await Registration(data);
		dispatch({ newState: REG_STATES.FETCH_SUCCESS });
		setTimeout(() => {
			resetForm();
			closePopup();
		}, MSG_TIMEOUT);
	}

	return (
		<div className="relative min-h-10 min-w-80 ">
			<FormStatusMsg state={state} />
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
		</div>
	);
}

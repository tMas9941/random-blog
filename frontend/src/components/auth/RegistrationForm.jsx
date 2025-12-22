import React, { useReducer } from "react";
import { REG_STATES, registrationReducer } from "../../hooks/reducers/regReducer.js";
import { login, registration } from "../../global/userData.js";
import { Form, Formik } from "formik";

// Components
import Button from "../buttons/Button";
import FormStatusMsg from "./FormStatusMsg.jsx";

import registrationValidation from "../../validations/registrationValidation.js";
import { useNavigate } from "react-router-dom";
import FormField from "../forms/FormField.jsx";

const MSG_TIMEOUT = 1200;

export default function RegistrationForm() {
    const [state, dispatch] = useReducer(registrationReducer, REG_STATES.INIT); // handle popup msg and form data
    const navigate = useNavigate();
    const handleSubmit = async (data) => {
        try {
            await attemptRegistration(data);
        } catch (error) {
            dispatch({ newState: REG_STATES.FETCH_FAILED, addValue: { message: error?.message || error.error } });
            setTimeout(() => dispatch({ newState: REG_STATES.INIT }), MSG_TIMEOUT);
        }
    };

    async function attemptRegistration(data) {
        dispatch({ newState: REG_STATES.FETCH_START });
        const newUser = await registration(data);
        dispatch({ newState: REG_STATES.FETCH_SUCCESS });
        setTimeout(async () => {
            await login(newUser);
            navigate("/home");
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
                        "relative p-6 [&>input]:border [&>input]:border-secondary [&>input]:rounded flex flex-col gap-2 " +
                        (state.lockForm && " [&>div]:opacity-0 pointer-events-none")
                    }
                >
                    <FormField name="username" type="text" />
                    <FormField name="email" type="text" />
                    <FormField name="password" type="password" />
                    <FormField text="password again" name="passwordAgain" type="password" />
                    <Button
                        disabled={state.lockForm}
                        text={"Create account"}
                        type={"submit"}
                        className={"mt-10 min-h-10 bg-primary text-n-text rounded"}
                    ></Button>
                </Form>
            </Formik>
        </div>
    );
}

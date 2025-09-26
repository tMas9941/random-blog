import React, { useReducer } from "react";

import { LOGIN_STATES, loginReducer } from "../../hooks/reducers/loginReducer.js";
import { Form, Formik } from "formik";

// Components
import Button from "../buttons/Button.jsx";
import { login } from "../../global/userData.js";
import FormStatusMsg from "./FormStatusMsg.jsx";
import loginValidation from "../../validations/loginValidation.js";
import FormField from "../misc/FormField.jsx";
import { useNavigate } from "react-router-dom";

const MSG_TIMEOUT = 2000;
export default function LoginForm() {
    const [state, dispatch] = useReducer(loginReducer, LOGIN_STATES.INIT); // handle popup msg and form data
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        try {
            await attemptLogin(data);
        } catch (error) {
            handleError(error);
        } finally {
            setTimeout(() => dispatch({ newState: LOGIN_STATES.INIT }), MSG_TIMEOUT);
        }
    };

    async function attemptLogin(data) {
        dispatch({ newState: LOGIN_STATES.FETCH_START });
        await login(data);
        navigate("/home");
        dispatch({ newState: LOGIN_STATES.INIT });
    }

    function handleError(error) {
        dispatch({
            newState: LOGIN_STATES.FETCH_FAILED,
            addValue: { message: error?.message || error.error },
        });
    }
    return (
        <div className="relative text-inherit min-h-10 min-w-80 ">
            <FormStatusMsg state={state} />

            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={loginValidation}
                onSubmit={handleSubmit}
            >
                <Form
                    className={
                        "relative p-6 [&>input]:border [&>input]:border-secondary [&>input]:rounded flex flex-col gap-2 " +
                        (state.lockForm && " [&>div]:opacity-0 pointer-events-none")
                    }
                >
                    <FormField name="username" type="text" />
                    <FormField name="password" type="password" />

                    <Button
                        disabled={state.lockForm}
                        text={"Log in"}
                        type={"submit"}
                        className={"mt-10 min-h-10 bg-primary text-n-text rounded"}
                    ></Button>
                </Form>
            </Formik>
        </div>
    );
}

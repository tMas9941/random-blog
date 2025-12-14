import { useState } from "react";
import { Formik, Form } from "formik";

// Components
import FormField from "../../components/misc/FormField";
import ColorButton from "../../components/buttons/ColorButton";

import passwordValidation from "../../validations/passwordValidation";
import { changePopupData, popupResults } from "../../global/popupHandler";
import { userSignal } from "../../global/userData";
import userService from "../../services/user.service";

const pulseAniamtion = " [&>:not(button)]:animate-pulse [&>:not(button)]:pointer-events-none ";

export default function PasswordSettings() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data, e) => {
        try {
            setLoading(true);
            await userService.changePassword(userSignal.value.id, data);
            e.resetForm();
            changePopupData("Password changed successfully!", popupResults.success);
        } catch (error) {
            changePopupData(error.message ? error.message : error.error, popupResults.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Formik
                initialValues={{ password: "", newPassword: "", newPasswordAgain: "" }}
                validationSchema={passwordValidation}
                onSubmit={handleSubmit}
            >
                <Form className={`flex flex-col gap-2 w-[50%] min-w-[300px] my-10 ${loading && pulseAniamtion}`}>
                    <h2>Change password:</h2>
                    <FormField name="password" text="Old password" type="password" />
                    <FormField name="newPassword" text="New password" type="password" />
                    <FormField name="newPasswordAgain" text="New password again" type="password" />

                    <ColorButton
                        text={"Save changes"}
                        type={"submit"}
                        className={`${loading && "disabled:!text-transparent "} w-fit mt-5 `}
                        disabled={loading}
                    >
                        {loading && <div className={"!absolute round-loader  scale-40 mx-auto "} />}
                    </ColorButton>
                </Form>
            </Formik>
        </>
    );
}

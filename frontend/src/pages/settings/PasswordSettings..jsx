import FormField from "../../components/forms/FormField";

import passwordValidation from "../../validations/passwordValidation";
import { changePopupData, popupResults } from "../../global/popupHandler";
import { userSignal } from "../../global/userData";
import userService from "../../services/user.service";

import CustomFormikForm from "../../components/forms/CustomFormikForm";

export default function PasswordSettings() {
    const handleSubmit = async (data, e) => {
        try {
            await userService.changePassword(userSignal.value.id, data);
            e.resetForm();
            changePopupData("Password changed successfully!", popupResults.success);
        } catch {
            changePopupData("Couldn't change password!");
        }
    };

    return (
        <>
            <CustomFormikForm
                initialValues={{ password: "", newPassword: "", newPasswordAgain: "" }}
                validationSchema={passwordValidation}
                onSubmit={handleSubmit}
            >
                <h2>Change password:</h2>
                <FormField name="password" text="Old password" type="password" />
                <FormField name="newPassword" text="New password" type="password" />
                <FormField name="newPasswordAgain" text="New password again" type="password" />
            </CustomFormikForm>
        </>
    );
}

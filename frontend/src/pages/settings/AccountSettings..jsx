import FormField from "../../components/forms/FormField.jsx";
import { userSignal } from "../../global/userData";
import accountValidation from "../../validations/accountValidation.js";
import detectObjDiff from "../../utils/detectObjDiff";
import userService from "../../services/user.service.js";
import { changePopupData, popupResults } from "../../global/popupHandler.js";
import CustomFormikForm from "../../components/forms/CustomFormikForm.jsx";

export default function AccountSettings() {
    const user = userSignal.value;

    const handleSubmit = async (values, e) => {
        try {
            const changes = detectObjDiff({ username: user.username, email: user.email }, values);
            if (Object.keys(changes).length) {
                const response = await userService.updateUserData(user.id, changes);
                userSignal.value = { ...userSignal.value, ...response };
                e.resetForm({ values });
                changePopupData("Settings changed successfully!", popupResults.success);
            }
        } catch {
            changePopupData("Couldn't change settings!", popupResults.error);
        }
    };

    return (
        <>
            <div className="flex gap-10 [&_p]:text-xl">
                <CustomFormikForm
                    initialValues={{
                        username: user.username,
                        email: user.email,
                    }}
                    validationSchema={accountValidation}
                    onSubmit={handleSubmit}
                >
                    <h2>Change account settings:</h2>
                    <FormField name="username" type="text" />
                    <FormField name="email" type="text" />
                </CustomFormikForm>
            </div>
        </>
    );
}

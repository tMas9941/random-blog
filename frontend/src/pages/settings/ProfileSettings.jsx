import SelectAvatar from "../../components/forms/SelectAvatar";
import FormField from "../../components/forms/FormField";

import CountryPicker from "../../components/misc/CountryPicker";

import { userSignal } from "../../global/userData";

import CustomFormikForm from "../../components/forms/CustomFormikForm";
import profileValidation from "../../validations/profileValidation";
import detectObjDiff from "../../utils/detectObjDiff";
import objToFormData from "../../utils/objToFormData";
import profileService from "../../services/profile.service";
import { changePopupData, popupResults } from "../../global/popupHandler";

export default function ProfileSettings() {
    const user = userSignal.value;
    console.log("render");
    const handleSubmit = async (values, e) => {
        try {
            const changes = detectObjDiff({ ...user.profile }, values);
            if (Object.keys(changes).length) {
                const formData = objToFormData(changes);
                const response = await profileService.updateProfile(formData, user.id);

                const newProfile = { ...userSignal.value.profile, ...response }; // merge profiles - in the future resposne may be changed
                userSignal.changeValue({
                    ...userSignal.value,
                    profile: newProfile,
                });

                e.resetForm({ values: { ...values, file: undefined } });
                changePopupData("Settings changed successfully!", popupResults.success);
            }
        } catch (error) {
            changePopupData("Couldn't change settings!", popupResults.error);
        }
    };
    return (
        <>
            <div className="flex gap-10 [&_p]:text-xl">
                <CustomFormikForm
                    initialValues={{
                        introduction: user.profile.introduction,
                        file: undefined,
                    }}
                    validationSchema={profileValidation}
                    onSubmit={handleSubmit}
                >
                    <SelectAvatar url={user.profile.avatarUrl} />

                    <FormField
                        as="textarea"
                        name="introduction"
                        type="text"
                        placeholder={"Tell us about yourself..."}
                        className="h-[10em]"
                    />
                    {/* <CountryPicker /> */}
                </CustomFormikForm>
            </div>
        </>
    );
}

import { Formik, Form } from "formik";
import DisplayAvatar from "../../components/misc/DisplayAvatar";
import FormField from "../../components/forms/FormField";

import CountryPicker from "../../components/misc/CountryPicker";

import { userSignal } from "../../global/userData";

import ColorButton from "../../components/buttons/ColorButton";
import SubmitButton from "../../components/forms/SubmitButton";
import CustomFormikForm from "../../components/forms/CustomFormikForm";

export default function ProfileSettings() {
    const user = userSignal.value;

    // const created = convertTimeStringToDate(user.created);
    // const daysDifference = calculateElapsedTime(new Date() - new Date(user.created));

    const handleSubmit = async (data) => {
        const profileId = user.profile.id;
        try {
            // const changes = matchData({ username: user.username, email: user.email, ...user.profile }, data);
            // console.log("changes  ", changes);
            // const response = await profileService.updateProfile({ ...changes }, profileId);
            // console.log({ response });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="flex gap-10 [&_p]:text-xl">
                <CustomFormikForm
                    initialValues={{
                        introduction: user.profile.introduction,
                    }}
                    // validationSchema={profileValidation}
                    onSubmit={handleSubmit}
                >
                    <DisplayAvatar url={user.profile.avatarUrl} profileId={user.profile.id} />
                    <FormField
                        as="textarea"
                        name="introduction"
                        type="text"
                        placeholder={"Tell us about yourself..."}
                        className="h-[15em]"
                    />
                    <CountryPicker />
                </CustomFormikForm>
            </div>
        </>
    );
}

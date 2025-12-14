import { Formik, Form } from "formik";
import DisplayAvatar from "../../components/misc/DisplayAvatar";
import FormField from "../../components/misc/FormField";

import CountryPicker from "../../components/misc/CountryPicker";
import profileValidation from "../../validations/profileValidation";
import { userSignal } from "../../global/userData";
import Button from "../../components/buttons/Button";
import ColorButton from "../../components/buttons/ColorButton";

export default function ProfileSettings() {
    const user = userSignal.value;

    // const created = convertTimeStringToDate(user.created);
    // const daysDifference = calculateElapsedTime(new Date() - new Date(user.created));

    const handleSubmit = (data) => {
        console.log(data);
    };
    return (
        <>
            <div className="flex gap-10 [&_p]:text-xl">
                <Formik
                    initialValues={{
                        username: user.username,
                        email: user.email,
                        introduction: user.profile.introduction,
                    }}
                    validationSchema={profileValidation}
                    onSubmit={handleSubmit}
                >
                    <Form className={"flex flex-col gap-2 w-[50%] min-w-[300px] relative"}>
                        <FormField name="username" type="text" />
                        <FormField name="email" type="text" />

                        <FormField
                            as="textarea"
                            name="introduction"
                            type="text"
                            placeholder={"Tell us about yourself..."}
                            className="h-[15em]"
                        />
                        <CountryPicker />
                        <ColorButton text={"Save changes"} type={"submit"} className="w-fit mt-5" />
                    </Form>
                </Formik>
                <DisplayAvatar url={user.profile.avatarUrl} profileId={user.profile.id} />
            </div>
        </>
    );
}

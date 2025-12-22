import { Form, Formik } from "formik";
import SubmitButton from "./SubmitButton";

const formClass = "flex flex-col gap-2 w-[50%] min-w-[300px] relative ";
const pulseAnimation = " [&>:not(button)]:animate-pulse [&>:not(button)]:pointer-events-none ";

export default function CustomFormikForm({ initialValues, validationSchema, onSubmit, children }) {
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ dirty, isSubmitting }) => (
                <Form className={`${formClass} ${isSubmitting && pulseAnimation}`}>
                    {children}
                    <SubmitButton loading={isSubmitting} dirty={dirty} />
                </Form>
            )}
        </Formik>
    );
}

import * as yup from "yup";

const MIN_USER = 6;

const accountValidation = yup.object({
    username: yup.string().min(MIN_USER, `Minimum ${MIN_USER} characters!`).required(`Required!`),
    email: yup.string().email("E-mail is not valid!").required(`Required!`),
});

export default accountValidation;

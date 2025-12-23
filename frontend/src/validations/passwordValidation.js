import * as yup from "yup";

const MIN_PASS = 10;

const passwordValidation = yup.object({
    password: yup.string().required(`Required!`).min(MIN_PASS, `Minimum ${MIN_PASS} characters!`),
    newPassword: yup.string().required(`Required!`).min(MIN_PASS, `Minimum ${MIN_PASS} characters!`),
    newPasswordAgain: yup
        .string()
        .required(`Required!`)
        .oneOf([yup.ref("newPassword"), null], "Passwords must match!"),
});

export default passwordValidation;

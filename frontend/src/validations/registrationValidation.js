import * as yup from "yup";

const MIN_USER = 6;
const MIN_PASS = 10;

const registrationValidation = yup.object({
	username: yup.string().min(MIN_USER, `Minimum ${MIN_USER} characters!`).required(`Minimum ${MIN_USER} characters!`),
	password: yup.string().min(MIN_PASS, `Minimum ${MIN_PASS} characters!`).required(`Minimum ${MIN_PASS} characters!`),
	email: yup.string().email("E-mail is not valid!").required(`Required!`),
	passwordAgain: yup.string().oneOf([yup.ref("password"), null], "Passwords must match!"),
});

export default registrationValidation;

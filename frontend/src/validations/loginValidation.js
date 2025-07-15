import * as yup from "yup";

const MIN_USER = 6;
const MIN_PASS = 10;

const authValidation = yup.object({
	username: yup.string().min(MIN_USER, `Minimum ${MIN_USER} characters!`).required(`Minimum ${MIN_USER} characters!`),
	password: yup.string().min(MIN_PASS, `Minimum ${MIN_PASS} characters!`).required(`Minimum ${MIN_PASS} characters!`),
});

export default authValidation;

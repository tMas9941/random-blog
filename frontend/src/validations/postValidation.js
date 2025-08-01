import * as yup from "yup";

const MIN_TITLE = 5;
const MIN_CONTENT = 10;

const postValidation = yup.object({
	title: yup.string().min(MIN_TITLE, `Minimum ${MIN_TITLE} characters!`).required(`Minimum ${MIN_TITLE} characters!`),
	content: yup
		.string()
		.min(MIN_CONTENT, `Minimum ${MIN_CONTENT} characters!`)
		.required(`Minimum ${MIN_CONTENT} characters!`),
	tags: yup.string().required(`Required`),
});

export default postValidation;

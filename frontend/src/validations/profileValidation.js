import * as yup from "yup";

const MAX_INTRODUCTION = 300;

const profileValidation = yup.object({
    introduction: yup.string().max(MAX_INTRODUCTION, `Maximum ${MAX_INTRODUCTION} characters!`),
    avatar: yup.mixed(),
});

export default profileValidation;

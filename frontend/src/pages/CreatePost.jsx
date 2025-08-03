import React, { useReducer } from "react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

// Components
import FormField from "../components/misc/FormField";
import ColorButton from "../components/buttons/ColorButton";
import postValidation from "../validations/postValidation";
import postService from "../services/post.service";
import { userSignal } from "../global/userData";
import { CREATE_STATES, createPostReducer } from "../hooks/reducers/createPostReducer";
import FormStatusMsg from "../components/auth/FormStatusMsg";

export default function CreatePost() {
	return (
		<div className="w-fit h-full mx-auto w-fit">
			<h1>Create Post</h1>

			<CreateForm />
		</div>
	);
}

const TIMEOUT = 2000;
const CreateForm = () => {
	const [state, dispatch] = useReducer(createPostReducer, CREATE_STATES.INIT);
	const navigate = useNavigate();

	const handleSubmit = async (data) => {
		dispatch({ newState: CREATE_STATES.FETCH_START });
		try {
			await postService.create({ ...data, userId: userSignal.value.id });
			dispatch({ newState: CREATE_STATES.FETCH_SUCCESS });
			setTimeout(() => {
				navigate("/posts");
			}, TIMEOUT);
		} catch (error) {
			dispatch({
				newState: CREATE_STATES.FETCH_FAILED,
				addValue: { message: error?.message },
			});
			setTimeout(() => {
				dispatch({ newState: CREATE_STATES.INIT });
			}, TIMEOUT);
		}
	};

	return (
		<div className="relative min-h-10 min-w-100 max-w-100 mt-5">
			<FormStatusMsg state={state} />
			<Formik
				initialValues={{ title: "", content: "", tags: "" }}
				validationSchema={postValidation}
				onSubmit={handleSubmit}
			>
				<Form
					className={
						"[&>button]:mx-auto relative p-3 [&>input]:border [&>input]:border-secondary [&>input]:rounded flex flex-col gap-2 " +
						(state.lockForm && " [&>div]:opacity-0  pointer-events-none")
					}
				>
					<FormField name="title" type="text" />
					<FormField
						as="textarea"
						name="content"
						type="text"
						placeholder={"Share your thoughts..."}
						className="h-[15em]"
					/>
					<FormField name="tags" type="text" />
					<div className="flex justify-between !opacity-100">
						<ColorButton
							disabled={state.lockForm}
							className="mt-5 bg-secondary/20 border-2 border-secondary text-secondary disabled:border-white"
							text={"Cancel"}
							onClick={() => navigate("/posts")}
						></ColorButton>
						<ColorButton disabled={state.lockForm} className="mt-5" text={"Publish"} type={"submit"}></ColorButton>
					</div>
				</Form>
			</Formik>
		</div>
	);
};

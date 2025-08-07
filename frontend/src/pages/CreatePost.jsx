import React, { useReducer, useRef } from "react";
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

import TagField from "../components/posts/TagField";

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
	const tagsRef = useRef([]);
	const navigate = useNavigate();

	const handleSubmit = async (data) => {
		// detect empty tag container
		console.log(" HANDLE SUBMIT");
		if (tagsRef.current.length === 0) {
			dispatch({ newState: CREATE_STATES.TAGS_ERROR });
			return;
		}
		// start uploading new post
		dispatch({ newState: CREATE_STATES.FETCH_START });
		try {
			await postService.create({ ...data, userId: userSignal.value.id, tags: tagsRef.current });
			dispatch({ newState: CREATE_STATES.FETCH_SUCCESS });
			setTimeout(() => {
				// navigate("/posts");
				dispatch({ newState: CREATE_STATES.INIT });
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
				onKeydown={(e) => {
					console.log("prevent");
					return e.preventDefault();
				}}
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
					<TagField
						name="tags"
						type="text"
						tagsRef={tagsRef}
						tagMessage={state.tagMessage}
						clearMessage={() => dispatch({ newState: CREATE_STATES.INIT })}
					/>
					<div className="flex justify-between !opacity-100">
						<ColorButton
							disabled={state.lockForm}
							className="mt-5 bg-secondary/20 border-2 border-secondary text-secondary disabled:border-white"
							text={"Cancel"}
							onClick={() => navigate("/posts")}
						></ColorButton>
						<ColorButton
							disabled={state.lockForm}
							className="mt-5"
							text={"Publish"}
							type={"submit"}
							onKeydown={(e) => {
								console.log("prevent");
								return e.preventDefault();
							}}
						></ColorButton>
					</div>
				</Form>
			</Formik>
		</div>
	);
};

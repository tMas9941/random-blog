import { Form, Formik } from "formik";
import React from "react";
import FormField from "../components/misc/FormField";
import ColorButton from "../components/buttons/ColorButton";
import postValidation from "../validations/postValidation";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
	return (
		<div className="w-fit h-full mx-auto w-fit">
			<h1>Create Post</h1>

			<CreateForm />
		</div>
	);
}

const CreateForm = () => {
	const navigate = useNavigate();
	const handleSubmit = async (data, { resetForm }) => {
		console.log("data ", data);
		try {
			await Login(data);
			dispatch({ newState: LOGIN_STATES.FETCH_SUCCESS });
			setTimeout(() => {
				close();
				resetForm();
			}, 700);
		} catch (error) {
			console.log("error : ", error);
			dispatch({
				newState: LOGIN_STATES.FETCH_FAILED,
				addValue: { message: error?.message },
			});
		}
	};
	return (
		<div className=" text-text min-h-10 min-w-100 max-w-100 mt-5">
			<Formik
				initialValues={{ title: "", content: "", tags: "" }}
				validationSchema={postValidation}
				onSubmit={handleSubmit}
			>
				<Form
					className={
						"[&>button]:mx-auto"
						// "relative p-3 [&>input]:border [&>input]:border-secondary [&>input]:rounded flex flex-col gap-2 " +
						// (state.lockForm && " [&>div]:opacity-0 pointer-events-none")
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
					<div className="flex justify-between">
						<ColorButton
							// disabled={state.lockForm}
							className="mt-5 bg-secondary"
							text={"Cancel"}
							onClick={() => navigate("/posts")}
						></ColorButton>
						<ColorButton
							// disabled={state.lockForm}
							className="mt-5"
							text={"Publish"}
							type={"submit"}
						></ColorButton>
					</div>
				</Form>
			</Formik>
		</div>
	);
};

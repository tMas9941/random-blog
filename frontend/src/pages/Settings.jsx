import React from "react";
import { userSignal } from "../global/userData";
import DisplayAvatar from "../components/misc/DisplayAvatar";
import calculateElapsedTime from "../utils/calculateEllapsedTime";
import convertTimeStringToDate from "../utils/convertTimeStringToDate";
import { Formik, Form } from "formik";

import FormField from "../components/misc/FormField";
import Button from "../components/buttons/Button";
import profileValidation from "../validations/profileValidation";
import CountryPicker from "../components/misc/CountryPicker";

export default function Settings() {
	return (
		<div className="[&>h2]:text-3xl [&>h2]:font-semibold [&>h1]:mb-10 [&>h2]:mb-10 [&_h3]:mb-5 [&_h3]:text-2xl [&>h2]:border-b [&>h2]:border-secondary/60">
			<h1>Settings</h1>
			<Account />
			<Password />
			<Profile />
		</div>
	);
}

function Account() {
	return (
		<>
			<h2>Account</h2>
		</>
	);
}
function Password() {
	return (
		<>
			<h2>Password</h2>
		</>
	);
}
function Profile() {
	const user = userSignal.value;

	// const created = convertTimeStringToDate(user.created);
	// const daysDifference = calculateElapsedTime(new Date() - new Date(user.created));

	const handleSubmit = (data) => {
		console.log(data);
	};
	return (
		<>
			<h2>Profile</h2>
			<div className="flex gap-10 [&_p]:text-xl">
				<DisplayAvatar url={user.profile.avatarUrl} profileId={user.profile.id} />
				<Formik
					initialValues={{ username: user.username, email: user.email, introduction: user.profile.introduction }}
					validationSchema={profileValidation}
					onSubmit={handleSubmit}
				>
					<Form
						className={
							"relative flex flex-col gap-2 w-[50%] min-w-[300px] [&>input]:border [&>input]:border-secondary [&>input]:rounded "
						}
					>
						<FormField name="username" type="text" />
						<FormField name="email" type="text" />

						<FormField
							as="textarea"
							name="introduction"
							type="text"
							placeholder={"Tell us about yourself..."}
							className="h-[15em]"
						/>
						<CountryPicker />
						<Button
							// disabled={state.lockForm}
							text={"Save changes"}
							type={"submit"}
							className={"mt-5 min-h-10 bg-primary text-n-text rounded w-full"}
						></Button>
					</Form>
				</Formik>
			</div>
		</>
	);
}

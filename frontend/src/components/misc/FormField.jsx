import { ErrorMessage, Field } from "formik";
import capitalize from "../../utils/capitalize";

export default function FormField({ name, type = "text", text }) {
	return (
		<div className="bg-background  ">
			<label className="peer bg-inherit text-md font-semibold flex items-center gap-3">
				{capitalize(text ? text : name) + ":"}

				<ErrorMessage name={name} component="div" className="text-warning text-sm font-normal " />
			</label>
			<Field
				type={type}
				name={name}
				className="border-secondary peer-has-[div]:border-warning w-full border px-2 p-[1px] outline-accent my-1 text-gray-800"
			/>
		</div>
	);
}

import { ErrorMessage, Field } from "formik";
import capitalize from "../../utils/capitalize";

export default function FormField({ name, type = "text" }) {
	return (
		<div className="bg-background mb-1 ">
			<label className="peer bg-inherit text-lg font-semibold flex items-center gap-3">
				{capitalize(name) + ":"}

				<ErrorMessage name={name} component="div" className="text-warning text-sm font-normal " />
			</label>
			<Field
				type={type}
				name={name}
				className="border-secondary peer-has-[div]:border-warning w-full border p-1 outline-accent my-1 text-gray-800"
			/>
		</div>
	);
}

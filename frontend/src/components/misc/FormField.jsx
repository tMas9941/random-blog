import { ErrorMessage, Field } from "formik";
import capitalize from "../../utils/capitalize";

export default function FormField({ name, type = "text", as, text, placeholder, className = "" }) {
	return (
		<div>
			<label className="peer text-md font-semibold flex items-center gap-3 my-1">
				{capitalize(text ? text : name) + ":"}

				<ErrorMessage name={name} component="div" className="text-warning text-sm font-normal" />
			</label>
			<Field
				name={name}
				type={type}
				as={as}
				placeholder={placeholder}
				className={
					"text-inherit border-[gray]/70 peer-has-[div]:border-warning/50 w-full border px-2 p-[3px] !outline-none my-1 text-gray-500 " +
					className
				}
			/>
		</div>
	);
}

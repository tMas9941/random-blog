import React, { useState } from "react";
import { ErrorMessage, Field, Form } from "formik";
import SvgComponent from "./SvgComponent";

export default function CountryPicker() {
	const [countryList, setCountryList] = useState([]);
	// TODO finish this
	const fetchCoutnries = async () => {};
	return (
		<div className="relative">
			<label className="peer text-md font-semibold flex items-center gap-3 my-1">
				Country
				<ErrorMessage name={"country"} component="div" className="text-warning text-sm font-normal" />
			</label>
			<input
				name={"country"}
				placeholder={"Serach for a country..."}
				className={
					"w-full px-2 p-[3px] h-12 text-inherit bg-secondary/20 outline-transparent outline-1 focus:outline-primary peer-has-[div]:outline-warning/50 rounded text-gray-500 "
				}
			/>
			<SvgComponent size={30} name={"search"} className={"absolute right-3 top-10 pointer-events-none"} />
		</div>
	);
}

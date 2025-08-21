import React, { useState } from "react";
import DropDownButton, { DropDownItem } from "../buttons/dropdown/DropDownButton";

export default function CountryPicker() {
	const [countryList, setCountryList] = useState([]);

	const fetchCoutnries = async () => {};
	return (
		<div>
			<DropDownButton text={"Country"}>
				<DropDownItem text={"Hungary"} />
				<DropDownItem text={"Slovakia"} />
			</DropDownButton>
		</div>
	);
}

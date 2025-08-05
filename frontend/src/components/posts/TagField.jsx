import capitalize from "../../utils/capitalize";
import TagBlock from "./TagBlock";
import { useRef, useState } from "react";

const MAX_TAGS = 5;

export default function TagField({ name, text, className = "", tagsRef, tagMessage, clearMessage }) {
	const [tags, setTags] = useState([...tagsRef.current]);
	const inputRef = useRef();
	const handeleInput = (e) => {
		e.preventDefault();

		if ([",", "#"].some((divider) => e.target.value.includes(divider))) {
			addTag(e);
			e.target.value = "";
		}
		if (tagMessage) clearMessage();
	};

	const addTag = (event) => {
		// split tags by "#" and "," , then remove recurring values
		let newTags = [...event.target.value.split(/[,#]+/)].filter((tag) => tag !== "" && !tags.includes(tag));
		newTags = [...tags, ...newTags];
		setTags(newTags);
		tagsRef.current = newTags;
		if (newTags.length >= MAX_TAGS) {
			inputRef.current.hidden = true;
			event.target.valeu = "";
		}
	};
	const removeTag = (tagToRemove) => {
		const newTags = tags.filter((tag) => tag !== tagToRemove);
		setTags(newTags);
		tagsRef.current = newTags;
		clearMessage();
		inputRef.current.hidden = false;
	};

	return (
		<div>
			<label className="peer text-md font-semibold flex items-center gap-3 my-1 ">
				{capitalize(text ? text : name) + ":"}
				{/* ERROR MESSAGE */}
				<span className="text-warning text-sm font-normal">{tagMessage}</span>
				<span className=" text-sm font-normal ms-auto">{tags.length + " / " + MAX_TAGS}</span>
			</label>
			<div
				className={` ${
					tagMessage ? "border-warning/50" : "border-[gray]/70"
				} w-full border  p-[3px] flex gap-1 items-center flex-wrap`}
			>
				{tags.map((tagName) => (
					<TagBlock key={tagName} name={tagName} remove={removeTag} />
				))}
				<input
					ref={inputRef}
					type="text"
					placeholder={"Add new tag..."}
					onKeyUp={handeleInput}
					className={"text-inherit w-full bg-secondary/10 p-1 !outline-none my-1 text-gray-500 " + +className}
				/>
			</div>
		</div>
	);
}

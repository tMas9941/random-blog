import capitalize from "../../utils/capitalize";
import TagBlock from "./TagBlock";
import { useRef, useState } from "react";

const MAX_TAGS = 5;
const MAX_TAG_LENGTH = 30;
export default function TagField({ name, text, className = "", tagsRef, tagMessage, clearMessage }) {
	const [tags, setTags] = useState([...tagsRef.current]);
	const inputRef = useRef();

	const handeleInput = (e) => {
		e.preventDefault();

		if ([",", "#"].some((divider) => e.target.value.includes(divider)) || e.keyCode == 13) {
			addTag(e);
			e.target.value = "";
		}
		if (tagMessage) clearMessage();
	};

	const addTag = (event) => {
		// split tags by "#" and ","
		// remove recurring values, limit tag length and tag count
		let newTags = [...event.target.value.split(/[,#]+/)].filter(
			(tag, index) =>
				tag !== "" && !tags.includes(tag) && tags.length + index < MAX_TAGS && tag.length <= MAX_TAG_LENGTH
		);
		newTags = [...tags, ...newTags];
		setTags(newTags);
		tagsRef.current = newTags;
		if (newTags.length >= MAX_TAGS) {
			inputRef.current.hidden = true;
		}
	};

	const removeTag = (tagToRemove) => {
		const newTags = tags.filter((tag) => tag !== tagToRemove);
		setTags(newTags);
		tagsRef.current = newTags;
		clearMessage();
		if (tagsRef.current.length < MAX_TAGS) inputRef.current.hidden = false;
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
					tagMessage ? "outline-warning/50" : "outline-[gray]/70 outline-transparent focus-within:outline-primary"
				} w-full  p-[3px] flex gap-1 items-center flex-wrap  bg-secondary/20  outline-1 rounded-sm `}
			>
				{tags.map((tagName) => (
					<TagBlock key={tagName} name={tagName} remove={removeTag} />
				))}
				<input
					ref={inputRef}
					type="text"
					name={name}
					placeholder={"Add new tag..."}
					onKeyDown={(e) => e.key === "Enter" && handeleInput(e)}
					onKeyUp={handeleInput}
					className={" text-inherit w-full p-1 !outline-none my-1 text-gray-500" + className}
				/>
			</div>
		</div>
	);
}

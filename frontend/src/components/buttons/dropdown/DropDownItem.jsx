import Button from "../Button";

export default function DropDownItem({ text, className = "", onClick }) {
	const newClassname = "hover:bg-secondary/30 px-5 min-h-10 w-full left-0 justify-start " + className;
	return <Button text={text} className={newClassname} onClick={onClick} />;
}

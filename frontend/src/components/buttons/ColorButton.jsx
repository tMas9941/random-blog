import Button from "./Button";
const themes = {
    primary: "bg-primary text-white ",
    secondary:
        "bg-secondary/10 border-2  max-h-[36px] border-secondary text-secondary disabled:border-white [&]:font-medium",
};
export default function ColorButton({
    text,
    type = "button",
    className = "",
    onClick,
    disabled,
    title,
    children,
    theme = "primary",
}) {
    const newClass = themes[theme] + " rounded text-md px-4 py-1 " + className + " disabled:text-white ";
    return (
        <Button
            text={text}
            type={type}
            className={newClass}
            onClick={onClick}
            disabled={disabled}
            title={title}
            children={children}
        />
    );
}

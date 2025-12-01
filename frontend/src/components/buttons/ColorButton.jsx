import Button from "./Button";
const themes = {
    primary: "bg-primary text-white py-1",
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
    const newClass = themes[theme] + " rounded text-lg px-4 " + className + " disabled:text-white ";
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

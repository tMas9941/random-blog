export default function ButtonContainer({ className, children, type = "post" }) {
    const classEffects = `[&>*]:hover:bg-primary/25 [&_a]:hover:bg-primary/25 
    [&_button,a]:hover:brightness-120 [&>button]:active:brightness-90`;
    return (
        <div
            className={`flex gap-1 w-full  [&>*]:rounded-sm [&_button,a]:px-1 [&_button,a]:h-full ${
                type === "comment" ? "h-7" : "h-8"
            } ${classEffects} ${className}`}
        >
            {children}
        </div>
    );
}

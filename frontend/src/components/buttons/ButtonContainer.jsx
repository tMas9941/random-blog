export default function ButtonContainer({ className, children, type = "post" }) {
    const classEffects = `[&_button]:hover:bg-primary/40 [&_a]:hover:bg-primary/40 
    [&_button]:hover:brightness-120 [&_a]:hover:brightness-120 `;
    return (
        <div
            className={`flex gap-4 w-full [&>*]:rounded-md [&>*]:px-1 [&>*]:${
                type === "comment" ? "h-10" : "h-11"
            } [&>button]:active:brightness-90
                ${classEffects}
                ${className}`}
        >
            {children}
        </div>
    );
}

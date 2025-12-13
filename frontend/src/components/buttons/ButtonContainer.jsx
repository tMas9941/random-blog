export default function ButtonContainer({ className, children, type = "post" }) {
    const classEffects = `[&>*]:hover:bg-primary/25 [&_a]:hover:bg-primary/25 
    [&_button]:hover:brightness-120 [&_a]:hover:brightness-120 `;
    return (
        <div
            className={`flex gap-1 w-full [&>*]:rounded-sm [&_button]:px-2 ${
                type === "comment" ? "[&_button]:py-1" : "[&>button]:py-1.5"
            } [&>button]:active:brightness-90
                ${classEffects}
                 ${className}`}
        >
            {children}
        </div>
    );
}

export default function PanelContainer({ children, className, isOwn = false, ref }) {
    return (
        <div
            ref={ref}
            className={` relative min-w-80 rounded-lg overflow-hidden
                ${isOwn ? "bg-primary/10 hover:bg-primary/15 border border-primary/20 " : "hover:bg-secondary/10"}
                ${className}`}
        >
            {children}
        </div>
    );
}

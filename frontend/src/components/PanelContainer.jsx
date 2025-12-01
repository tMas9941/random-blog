export default function PanelContainer({ children, className, isOwn = false, ref }) {
    return (
        <div
            ref={ref}
            className={` relative min-w-80 rounded-md overflow-hidden 
                ${isOwn ? "bg-primary/7 border-secondary hover:bg-primary/12" : "hover:bg-secondary/10"}
                ${className}`}
        >
            {children}
        </div>
    );
}

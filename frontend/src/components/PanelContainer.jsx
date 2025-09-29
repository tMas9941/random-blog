export default function PanelContainer({ children, className }) {
    return (
        <div className={"relative min-w-80 bg-secondary/10 rounded-lg overflow-hidden " + className}>{children}</div>
    );
}

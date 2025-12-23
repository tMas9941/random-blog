import "./round-loader.css";
import "./line-loader.css";

export default function Loader({ className }) {
    return (
        <div className="loading flex items-center justify-center w-full min-h-25 ">
            <div className={"h-10 !text-accent " + className}>Loader</div>
        </div>
    );
}

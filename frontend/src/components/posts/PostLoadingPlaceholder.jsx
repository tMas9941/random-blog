import Loader from "../misc/loader/Loader";

export default function PostLoadingPlaceholder({ className }) {
    return (
        <div
            className={
                "z-10 absolute  w-full h-full backdrop-blur-[4px] visible:[&~*]:pointer-events-none bg-primary/20 " +
                className
            }
        >
            <Loader className="line-loader" />
        </div>
    );
}

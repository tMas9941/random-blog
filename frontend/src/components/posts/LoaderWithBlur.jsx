import Loader from "../misc/loader/Loader";

export default function LoaderWithBlur({ className, type = "round-loader" }) {
    return (
        <div
            className={
                "z-10 absolute w-full min-h-full backdrop-blur-[4px] visible:[&~*]:pointer-events-none bg-primary/20 flex items-center " +
                className
            }
        >
            <Loader className={type} />
        </div>
    );
}

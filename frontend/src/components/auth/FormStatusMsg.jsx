import SvgComponent from "../misc/SvgComponent";
import Loader from "../misc/loader/Loader";

const SVG_SIZE = 100;
export default function FormStatusMsg({ state }) {
    return (
        state.lockForm && (
            <>
                <div
                    className={`absolute z-10 w-full h-full flex flex-col justify-center items-center  -mt-5
                        
                    }`}
                >
                    {state.loading ? (
                        <Loader className={"round-loader scale-150 "}></Loader>
                    ) : (
                        <SvgComponent
                            name={state.fetchStatus ? "success" : "error"}
                            size={SVG_SIZE}
                            className={"fill-inherit"}
                        />
                    )}
                    <p className="text-xl text-center ">{state.message}</p>
                </div>
            </>
        )
    );
}

import SvgComponent from "../misc/SvgComponent";
import useSignal from "../../hooks/useSignal";
import { popupSignal, resetPopupData } from "../../global/popupHandler";

const DURATION = 1500;
const WIDTH = 400;

let timer;

export default function MessagePopup() {
    const popupData = useSignal(popupSignal, "MessagePopup");

    const result = popupData.result;
    const message = popupData.message;
    const show = popupData.show;

    startTimer(timer); // hide popup on timeout

    return (
        <>
            <div
                className={`fixed z-50 left-[50%] min-h-20 bg-inherit border-1 rounded-lg
             transition-position duration-200 ease-out backdrop-blur-sm flex gap-2 overflow-hidden  ${
                 show ? " top-20 animate-wiggle" : " top-0 opacity-0 "
             }  border-${result}`}
                style={{ width: WIDTH, marginLeft: -WIDTH / 2 }}
            >
                <div className={`px-5 py-2 min-h-full bg-${result} flex justify-center`}>
                    <SvgComponent name={result} className={"h-full fill-white"} size="60" />
                </div>

                <span className="block min-h-fit p-2 text-xl m-auto font-semibold">{message}</span>
            </div>

            <div className=" fixed min-w-full h-full z-50" hidden={!show} onClick={hidePopup}></div>
        </>
    );
}

function startTimer() {
    clearTimeout(timer);
    timer = setTimeout(resetPopupData, DURATION);
}

function hidePopup(e) {
    e.stopPropagation();
    clearTimeout(timer);
    resetPopupData();
}

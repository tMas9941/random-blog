import { darkModeSignal, toggleDarkMode } from "../../global/userData.js";

export default function DarkModeSwitch() {
    return (
        <button
            onClick={toggleDarkMode}
            className={`relative z-1 w-7 h-7 mx-2 [&,&_*]:rounded-full  cursor-pointer outline-2 outline-background 
            border-3 border-n-background hover:brightness-120 bg-background active:scale-90 
			 [&,&_*]:transition-all [&_*]:duration-200  overflow-hidden`}
            title="Toggle between dark/light mode"
        >
            <div
                className={`absolute -z-5 w-6 h-6 origin-[50%_-110%] bg-n-background -end-2 -top-0.5 ${
                    darkModeSignal.value ? "" : " -rotate-90"
                }`}
            ></div>
        </button>
    );
}

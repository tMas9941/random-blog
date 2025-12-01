import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import useSignalState from "./hooks/useSignalState";
import { darkModeSignal } from "./global/userData";
import MessagePopup from "./components/popup/MessagePopup";

const themes = {
    true: "bg-n-background text-n-text fill-n-text stroke-n-text",
    false: "bg-background text-text fill-text stroke-text",
};

function App() {
    const darkMode = useSignalState(darkModeSignal, "App");

    return (
        <div className={"min-h-screen  " + themes[darkMode]}>
            <Header />
            <MessagePopup />
            <div className=" py-20 max-w-[1280px] mx-auto [&_h1]:text-4xl [&_h1]:font-semibold ">
                <Outlet />
            </div>
        </div>
    );
}

export default App;

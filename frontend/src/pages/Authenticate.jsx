import useSignal from "../hooks/useSignal";
import { darkModeSignal } from "../global/userData";

import Button from "../components/buttons/Button";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderButton from "../components/buttons/HeaderButton";
import PanelContainer from "../components/PanelContainer";

export default function Authenticate() {
    const darkMode = useSignal(darkModeSignal, "Authenticate");
    const navigate = useNavigate();

    return (
        <div
            className={` w-full h-full  
					 ${darkMode ? " text-n-text" : "text-text"} flex justify-center
					`}
        >
            <PanelContainer className={"bg-secondary/10"}>
                <div className="flex w-full h-13 [&>button]:w-full ">
                    <HeaderButton text={"Login"} onClick={() => navigate("login")} className={"text-inherit"} />
                    <HeaderButton text={"Registration"} onClick={() => navigate("registration")} />
                </div>

                <Outlet />
            </PanelContainer>
        </div>
    );
}

import React from "react";

import "./round-loader.css";
import "./line-loader.css";

export default function Loader({ className }) {
    return (
        <div className="loading flex items-center justify-center w-full min-h-[200px]">
            <div className={"h-10 !text-accent brightness-120 " + className}>Loader</div>
        </div>
    );
}

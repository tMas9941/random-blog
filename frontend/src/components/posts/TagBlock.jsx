import React from "react";
import SvgComponent from "../misc/SvgComponent";

export default function TagBlock({ name = "Default", remove }) {
    return (
        <div className="min-w-fit px-1.5 pb-[1px] bg-secondary/20 border border-secondary/20 flex gap-2 items-center rounded-md text-md font-semibold ">
            {name}
            {remove && (
                <SvgComponent
                    name={"close"}
                    size={22}
                    className={"fill-accent cursor-pointer hover:bg-secondary/30 rounded-md -me-1"}
                    onClick={() => remove(name)}
                />
            )}
        </div>
    );
}

import React from "react";
import Button from "./Button";

function isActive(text, location) {
    return location.pathname.split("/").includes(text.toLowerCase());
}

export default function HeaderButton({ text, onClick }) {
    const underLine = `${isActive(text, window.location) && " after:h-[2px] "} 
    after:bg-primary after:w-full after:absolute after:left-0 after:bottom-0 `;
    const newClass = "relative bg-transparent  font-bold hover:bg-secondary/30  min-h-full " + underLine;
    return <Button text={text.toUpperCase()} className={newClass} onClick={onClick} />;
}

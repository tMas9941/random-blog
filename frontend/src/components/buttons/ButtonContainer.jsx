import React from "react";

export default function ButtonContainer({ className, children }) {
    return (
        <div
            className={
                "flex gap-4 w-full [&>*]:hover:bg-primary/20 [&>*]:hover:brightness-110 [&>*]:rounded-md [&>*]:px-1 [&>*]:h-11 [&>*]:active:brightness-90 " +
                className
            }
        >
            {children}
        </div>
    );
}

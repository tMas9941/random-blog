import React from "react";

export default function ButtonContainer({ className, children }) {
    return (
        <div
            className={
                "flex gap-4 w-full [&_button]:hover:bg-primary/40 [&_a]:hover:bg-primary/40 [&_button]:hover:brightness-120 [&_a]:hover:brightness-120 [&>*]:rounded-md [&>*]:px-1 [&>*]:h-11 [&>button]:active:brightness-90  " +
                className
            }
        >
            {children}
        </div>
    );
}

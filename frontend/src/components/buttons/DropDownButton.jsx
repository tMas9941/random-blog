import React, { useRef, useState } from "react";
import Button from "./Button";

function AddExtraProps(Component, extraProps) {
	return <Component.type {...Component.props} {...extraProps} />;
}

export default function DropDownButton({ text, dropDownComponent }) {
	const [showMenu, setShowMenu] = useState(false);
	const arrowRef = useRef();
	const containerRef = useRef();

	const className =
		" flex gap-2 hover:bg-secondary/30 min-h-12 items-center border border-transparent text-white hover:bg-primary hover:text-white text-sm";

	return (
		<div ref={containerRef} className="flex flex-col ">
			<Button text={text.toUpperCase()} className={className} onClick={() => setShowMenu(true)}>
				<svg
					ref={arrowRef}
					width="20px"
					height="20px"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={showMenu ? " -rotate-90" : " rotate-90"}
				>
					<path
						d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z"
						fill="#ffffff"
					/>
				</svg>
			</Button>
			{
				<div
					className={`relative z-20 ${
						showMenu ? "opacity-100 " : "opacity-0 pointer-events-none"
					} transition-[opacity] duration-150 ease-out`}
				>
					{
						<div
							style={{
								right:
									containerRef.current?.getBoundingClientRect().right -
										arrowRef.current?.getBoundingClientRect().right || 0,
							}}
							className="absolute bot-0 border-10 border-transparent border-b-background "
						></div>
					}
					<div className="right-0 absolute bg-background p-5 w-fit h-fit mt-[20px] rounded-lg">
						{/* bind hte popup close function to the passed component */}
						{AddExtraProps(dropDownComponent, { close: () => setShowMenu(false) })}

						<div
							className="fixed -z-1 left-0 top-0 h-full w-full bg-black/30 backdrop-blur-[1px]"
							onClick={() => setShowMenu(false)}
						></div>
					</div>
				</div>
			}
		</div>
	);
}

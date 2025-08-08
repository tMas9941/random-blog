import React from "react";

export default function SvgComponent({ name, size = 50, className, ref, id, onClick }) {
	switch (name) {
		case "success":
			return (
				<svg width={size} height={size} viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
					<title>success</title>
					<g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
						<g id="add-copy" fill="#008c17" transform="translate(42.666667, 42.666667)">
							<path
								d="M213.333333,3.55271368e-14 C95.51296,3.55271368e-14 3.55271368e-14,95.51296 3.55271368e-14,213.333333 C3.55271368e-14,331.153707 95.51296,426.666667 213.333333,426.666667 C331.153707,426.666667 426.666667,331.153707 426.666667,213.333333 C426.666667,95.51296 331.153707,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,384 C119.227947,384 42.6666667,307.43872 42.6666667,213.333333 C42.6666667,119.227947 119.227947,42.6666667 213.333333,42.6666667 C307.43872,42.6666667 384,119.227947 384,213.333333 C384,307.43872 307.438933,384 213.333333,384 Z M293.669333,137.114453 L323.835947,167.281067 L192,299.66912 L112.916693,220.585813 L143.083307,190.4192 L192,239.335893 L293.669333,137.114453 Z"
								id="Shape"
							></path>
						</g>
					</g>
				</svg>
			);
		case "failed":
			return (
				<svg width={size} height={size} viewBox="-1 -1 16 16" xmlns="http://www.w3.org/2000/svg " fill="none">
					<g fillRule="evenodd">
						<path d="M0 7a7 7 0 1 1 14 0A7 7 0 0 1 0 7z" className="stroke-warning" />
						<path d="M13 7A6 6 0 1 0 1 7a6 6 0 0 0 12 0z" fill="none" />
						<path
							className="fill-warning"
							d="M7 5.969L5.599 4.568a.29.29 0 0 0-.413.004l-.614.614a.294.294 0 0 0-.004.413L5.968 7l-1.4 1.401a.29.29 0 0 0 .004.413l.614.614c.113.114.3.117.413.004L7 8.032l1.401 1.4a.29.29 0 0 0 .413-.004l.614-.614a.294.294 0 0 0 .004-.413L8.032 7l1.4-1.401a.29.29 0 0 0-.004-.413l-.614-.614a.294.294 0 0 0-.413-.004L7 5.968z"
						/>
					</g>
				</svg>
			);
		case "close":
			return (
				<svg
					width={size}
					height={size}
					className={className}
					onClick={onClick}
					viewBox="0 0 1024 1024"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z" />
				</svg>
			);
		case "singleArrow":
			return (
				<svg
					ref={ref}
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={"fill-[white] " + className}
				>
					<path d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z" />
				</svg>
			);
		case "logo":
			return (
				<svg height={50} width={70} fill="white" onClick={onClick} className="cursor-pointer">
					<text x="7" y="16" fontSize={13} fontWeight="bold">
						RaNDoM
					</text>
					<text x="5" y="40" fontSize={26} fontWeight="bold">
						BloG
					</text>
				</svg>
			);

		case "pen":
			return (
				<svg
					width={size}
					height={size}
					ref={ref}
					className={className}
					viewBox="0 0 311.012 311.012"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g id="pen" transform="translate(-2346.464 -1805.801)">
						<path
							id="Path_11"
							data-name="Path 11"
							d="M2648.648,1861.794l-47.165-47.164a30.14,30.14,0,0,0-42.627,0l-197.433,197.43a12.111,12.111,0,0,0-3.438,6.937l-11.411,84.069a12.115,12.115,0,0,0,13.634,13.634l84.07-11.411a12.112,12.112,0,0,0,6.937-3.438l197.433-197.43a30.142,30.142,0,0,0,0-42.627Zm-211.677,220.035-64.247,8.72,8.721-64.246,139.906-139.9,55.525,55.526Zm194.543-194.541-37.5,37.5-55.526-55.525,37.5-37.5a5.913,5.913,0,0,1,8.362,0l47.165,47.164a5.91,5.91,0,0,1,0,8.361Z"
							fill="#ffffff"
						/>
					</g>
				</svg>
			);
	}
}

import React from "react";

export default function SvgComponent({ name, size = 50, className, ref, id, onClick }) {
	switch (name) {
		case "success":
			return (
				<svg
					width={size}
					height={size}
					className={className}
					viewBox="0 0 512 512"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
						<g className="fill-success" id="add-copy" transform="translate(42.666667, 42.666667)">
							<path d="M213.333333,3.55271368e-14 C95.51296,3.55271368e-14 3.55271368e-14,95.51296 3.55271368e-14,213.333333 C3.55271368e-14,331.153707 95.51296,426.666667 213.333333,426.666667 C331.153707,426.666667 426.666667,331.153707 426.666667,213.333333 C426.666667,95.51296 331.153707,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,384 C119.227947,384 42.6666667,307.43872 42.6666667,213.333333 C42.6666667,119.227947 119.227947,42.6666667 213.333333,42.6666667 C307.43872,42.6666667 384,119.227947 384,213.333333 C384,307.43872 307.438933,384 213.333333,384 Z M293.669333,137.114453 L323.835947,167.281067 L192,299.66912 L112.916693,220.585813 L143.083307,190.4192 L192,239.335893 L293.669333,137.114453 Z"></path>
						</g>
					</g>
				</svg>
			);
		case "failed":
			return (
				<svg width={size} height={size} viewBox="-1 -1 16 16" xmlns="http://www.w3.org/2000/svg " fill="none">
					<g stroke="none">
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
					xmlns="http://www.w3.org/2000/svg"
					className={className}
				>
					<path d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z" />
				</svg>
			);
		case "fullArrow":
			return (
				<svg ref={ref} width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M6 8L2 8L2 6L8 5.24536e-07L14 6L14 8L10 8L10 16L6 16L6 8Z"
						strokeWidth={2}
						stroke={"white"}
						fill="blue"
					/>
				</svg>
			);
		case "emptyArrow":
			return (
				<svg
					ref={ref}
					width={size}
					height={size}
					className={className}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 18"
				>
					<g fill="">
						<path d="M12 8H15.1716L10 2.82843L4.82843 8H8V16H12V8ZM14 18H6V10H0L10 0L20 10H14V18Z"></path>
					</g>
				</svg>
			);
		case "nextArrow":
			return (
				<svg
					ref={ref}
					width={size}
					height={size}
					className={className}
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M5.08884 11.2945C5.26942 11.7216 5.69482 12 6.16669 12H9V19C9 19.5523 9.44772 20 10 20H14C14.5523 20 15 19.5523 15 19V12H17.8333C18.3052 12 18.7306 11.7216 18.9112 11.2945C19.0917 10.8674 18.9919 10.3759 18.6583 10.049L12.825 4.33474C12.3693 3.88842 11.6307 3.88842 11.175 4.33474L5.34174 10.049C5.00808 10.3759 4.90826 10.8674 5.08884 11.2945Z" />
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
		case "comment":
			return (
				<svg
					width={size}
					height={size}
					ref={ref}
					className={className}
					viewBox="0 -2.97 310 310"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g id="comment" transform="translate(-1100.982 -3679.416)">
						<g id="Group_6" data-name="Group 6">
							<path
								id="Path_28"
								data-name="Path 28"
								d="M1324.125,3983.477a12.109,12.109,0,0,1-7.7-2.763l-80.593-66.3H1130.079c-15.919,0-29.1-13.262-29.1-29.569V3708.835a29.365,29.365,0,0,1,29.1-29.419h252.093c16.089,0,28.81,13.185,28.81,29.419v176.012c0,16.308-12.721,29.569-28.81,29.569h-46.19v56.946a12,12,0,0,1-6.814,10.955A11.556,11.556,0,0,1,1324.125,3983.477Zm-194.046-280.061a5.528,5.528,0,0,0-5.1,5.419v176.012c0,2.9,2.582,5.569,5.1,5.569h110.1a11.977,11.977,0,0,1,7.683,2.646l64.122,52.647v-43.4a11.949,11.949,0,0,1,12.141-11.891h58.049c2.59,0,4.81-2.772,4.81-5.569V3708.835c0-2.777-2.173-5.419-4.81-5.419Z"
							/>
						</g>
					</g>
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
						/>
					</g>
				</svg>
			);
	}
}

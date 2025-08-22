import { CLOUD_NAME } from "../../constants/constants";

const defaultUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1755695929/default_avatar.jpg`;

export default function Avatar({ size = 80, url = defaultUrl }) {
	return (
		<div
			style={{
				minWidth: size,
				minHeight: size,
				width: size,
				height: size,
				borderWidth: Math.max(2, size * 0.04),
			}}
			className="relative flex items-center justify-center rounded-[15%] overflow-hidden select-none"
		>
			<img className="z-2 w-full h-full pointer-events-none " src={url} />
		</div>
	);
}

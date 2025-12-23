import { CLOUD_NAME } from "../../constants/environment";

const defaultUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1755695929/default_avatar.jpg`;

export default function Avatar({ size = 80, url = defaultUrl, isOwn = false }) {
    const borderSize = Math.max(1.5, size * 0.03);
    return (
        <div
            style={{
                minWidth: size,
                minHeight: size,
                width: size,
                height: size,
                marginTop: borderSize,
                borderWidth: borderSize,
            }}
            className={`relative flex items-center justify-center rounded-[15%] overflow-hidden select-none ${
                isOwn && "border-primary"
            }`}
        >
            <img className="z-2 w-full h-full pointer-events-none " src={url} />
        </div>
    );
}

import { changePopupData, popupResults } from "../../global/popupHandler";
import Button from "../buttons/Button";
import SvgComponent from "../misc/SvgComponent";

export default function ShareButton({ className, postId }) {
    const handleClick = () => {
        const link = window.location.host + "/posts/" + postId;
        navigator.clipboard.writeText(link);
        changePopupData("Link copied to clipboard! ", popupResults.warning);
    };
    return (
        <Button title={"Edit post"} text={"Share"} className={className} onClick={handleClick}>
            <SvgComponent size={25} name={"share"} className={"fill-accent stroke-accent"} />
        </Button>
    );
}

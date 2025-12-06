import { useState } from "react";
import SvgComponent from "./SvgComponent";

const ICON_SIZE = 30;

export default function FileInput({ imgRef }) {
    const [file, setFile] = useState("");

    const handleInput = (e) => {
        const img = e.target.files[0];
        if (!img) return;
        var reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = function () {
            setFile(reader.result);
            imgRef.current = img;
        };
    };

    const handleDelete = () => {
        setFile(null);
    };

    return (
        <div className="p-2 flex gap-3 text-inherit bg-secondary/20 outline-transparent outline-1  rounded ">
            <div className="flex flex-col justify-between min-h-full">
                <input type="file" id="file-input" className="hidden" onChange={handleInput}></input>
                <label
                    htmlFor="file-input"
                    className="p-1  w-fit h-fit rounded-md cursor-pointer hover:bg-primary/20"
                    title="Add image..."
                >
                    <SvgComponent name={"plus"} size={ICON_SIZE} className={"fill-accent stroke-accent"} />
                </label>
                {file && (
                    <button type="button" onClick={handleDelete} title="Remove image!">
                        <SvgComponent
                            name={"trashbin"}
                            size={ICON_SIZE}
                            className={"fill-error p-1  w-fit h-fit rounded-md cursor-pointer hover:bg-primary/20"}
                        />
                    </button>
                )}
            </div>
            {file && (
                <>
                    <img src={file} className="w-full min-h-30 max-h-100"></img>
                </>
            )}
        </div>
    );
}

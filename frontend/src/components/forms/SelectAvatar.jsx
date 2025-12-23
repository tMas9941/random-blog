import { useState } from "react";

import SvgComponent from "../misc/SvgComponent";
import { Field, useFormikContext } from "formik";

export default function SelectAvatar({ url }) {
    const [selectedImage, setSelectedImage] = useState(url);
    const { setFieldValue } = useFormikContext();

    function handleChange(e) {
        if (!e.target.files[0]) return;
        setSelectedImage(e.target.files[0]);
        setFieldValue("file", e.target.files[0]);
    }

    return (
        <div className="flex flex-col  ">
            <h3 className="text-md font-semibold my-1">Avatar:</h3>
            <div className="relative group w-[170px] h-[170px] m-2 max-w-[200px] max-h-[200px] overflow-hidden rounded-[15%] outline-6 outline-primary  ">
                {selectedImage && (
                    <img
                        className=" absolute w-full h-full scale-105 pointer-events-none object-cover"
                        src={detectSrcType(selectedImage)}
                    />
                )}

                <Field
                    name="avatarField"
                    type="file"
                    title="Change avatar"
                    placeholder={"Loading..."}
                    onChange={handleChange}
                    className={
                        "text-transparent w-full h-full  group-hover:bg-black/30 group-hover:backdrop-blur-[2px]  cursor-pointer"
                    }
                />
                <SvgComponent
                    name={"uploadImg"}
                    size={100}
                    className={
                        "z-4 stroke-primary pointer-events-none absolute opacity-0 left-0 right-0 top-0 bottom-0 m-auto w-fit h-fit group-hover:opacity-100 brightness-120 "
                    }
                />
            </div>
        </div>
    );
}

function detectSrcType(src) {
    if (typeof src === "string") {
        return src;
    } else if (typeof src === "object") return URL.createObjectURL(src);
}

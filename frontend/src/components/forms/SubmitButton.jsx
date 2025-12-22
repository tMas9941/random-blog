import ColorButton from "../buttons/ColorButton";

export default function SubmitButton({ loading = false, text = "Save changes", dirty }) {
    return (
        <ColorButton
            text={text}
            type={"submit"}
            className={` w-fit mt-5 ` + (loading && " [&]:!text-transparent ")}
            disabled={!dirty || loading}
        >
            {loading && <div className={"!absolute round-loader  scale-30 mx-auto "} />}
        </ColorButton>
    );
}

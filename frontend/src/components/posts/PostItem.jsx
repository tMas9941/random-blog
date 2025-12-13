import { memo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Utils
import convertTimeStringToDate from "../../utils/convertTimeStringToDate";
import calculateElapsedTime from "../../utils/calculateEllapsedTime";

// Components
import Avatar from "../misc/Avatar";
import TagBlock from "./TagBlock";
import SvgComponent from "../misc/SvgComponent";
import { userSignal } from "../../global/userData";
import PanelContainer from "../PanelContainer";

// Buttons
import VoteButton from "../vote/VoteButton";
import ButtonContainer from "../buttons/ButtonContainer";
import DeleteButton from "../buttons/DeleteButton";
import LoaderWithBlur from "./LoaderWithBlur";
import ShareButton from "./ShareButton";

const buttonClass = "flex items-center gap-2 fill-accent text-xl !px-4";

const PostItem = memo(({ data, onPostPage = false }) => {
    const [loading, setLoading] = useState(false);
    const containerRef = useRef();
    const isOwn = data.userId === userSignal.value?.id;
    if (!data) return <></>;
    return (
        <PanelContainer
            ref={containerRef}
            className={` ${loading && "loading pointer-events-none"} peer animate-fade-in origin-top`}
            isOwn={isOwn}
        >
            {loading && <LoaderWithBlur />}
            <PostContent
                data={data}
                onPostPage={onPostPage}
                isOwn={isOwn}
                setLoading={setLoading}
                containerRef={containerRef}
            />
        </PanelContainer>
    );
}, areEqual);

const PostContent = ({ data, onPostPage, isOwn, setLoading, containerRef }) => {
    const convertedDate = convertTimeStringToDate(data.created);
    const timePassed = calculateElapsedTime(new Date() - new Date(data.created));
    const navigate = useNavigate();

    return (
        <div className="flex m-4 gap-4 ">
            <div className="min-w-30 [&_div]:mb-2 ">
                <Avatar text={data.user.username} size={80} url={data.user.profile?.avatarUrl} isOwn={isOwn} />
                <h3 className={`font-semibold truncate ${isOwn && "text-primary"}`}>{data.user.username}</h3>
                <p> {convertedDate.date}</p>
                <p> {convertedDate.time}</p>
            </div>
            <div className="flex flex-col w-full gap-5 [&>p]:min-h-20">
                <div>
                    <Link
                        to={"/posts/" + data.id}
                        className={`text-2xl font-semibold hover:underline ${
                            (onPostPage && "pointer-events-none", isOwn && "text-primary")
                        }`}
                    >
                        {data.title}
                    </Link>
                    <p className="inline ms-3 mt-auto font-italic text-sm text-[gray]/80"> {timePassed}</p>
                </div>
                <p className="break-all ">{data.content}</p>
                {data?.imgUrl && (
                    <img src={data.imgUrl} loading={"lazy"} alt={"Loading picture..."} className="w-full"></img>
                )}
                <div className="flex gap-2 mt-auto ">
                    {data.tags.map((tag) => (
                        <TagBlock key={tag.tagName} name={tag.tagName} />
                    ))}
                </div>
                <ButtonContainer>
                    <VoteButton postId={data.id} votes={data.votes} isOwn={isOwn} />
                    {!onPostPage && <CommentButton postId={data.id} count={data._count.comments} />}
                    <ShareButton className={buttonClass} postId={data.id} />
                    {isOwn && (
                        <>
                            <DeleteButton
                                containerRef={containerRef}
                                type="post"
                                className={buttonClass + " ms-auto"}
                                data={data}
                                setLoading={setLoading}
                            />
                        </>
                    )}
                </ButtonContainer>
            </div>
        </div>
    );
};

export default PostItem;

function areEqual(prevProps, nextProps) {
    if (prevProps.data.id !== nextProps.data.id) return false;
    return true;
}
function CommentButton({ postId, count }) {
    return (
        <Link to={"/posts/" + postId + "#comment"} className={buttonClass + " font-semibold"}>
            <SvgComponent name={"comment"} size={25} />
            <span className="mx-1 text-accent font-bold stroke-1">{count}</span>
            Comments
        </Link>
    );
}

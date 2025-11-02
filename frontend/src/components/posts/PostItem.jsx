import { memo, useState } from "react";
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
import PostLoadingPlaceholder from "./PostLoadingPlaceholder";
import ShareButton from "./ShareButton";

const buttonClass = "flex items-center gap-2 fill-accent text-xl !px-4";

export default function PostItem({ data, onPostPage = false, removeSelfFromList }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const isOwn = data.userId === userSignal.value?.id;

    if (!data) return <></>;

    return (
        <PanelContainer className={`p-4 ${loading && "loading"} peer `} isOwn={isOwn}>
            {loading && <PostLoadingPlaceholder className={"-m-4"} />}
            <PostContent data={data} onPostPage={onPostPage} />
            <ButtonContainer>
                <VoteButton postId={data.id} votes={data.votes} isOwn={isOwn} />
                {!onPostPage && <CommentButton postId={data.id} count={data._count.comments} />}
                <ShareButton className={buttonClass} postId={data.id} />
                {isOwn && (
                    <>
                        <DeleteButton
                            type="post"
                            className={buttonClass}
                            data={data}
                            removeSelfFromList={removeSelfFromList}
                            setLoading={setLoading}
                            onSuccess={() => navigate("/posts")}
                        />
                    </>
                )}
            </ButtonContainer>
        </PanelContainer>
    );
}

const CommentButton = ({ postId, count }) => (
    <Link to={"/posts/" + postId + "#comment"} className={buttonClass}>
        <SvgComponent name={"comment"} size={25} />
        <span className="mx-1 text-accent font-bold">{count}</span>
        Comments
    </Link>
);

const PostContent = memo(({ data, onPostPage }) => {
    const convertedDate = convertTimeStringToDate(data.created);
    const timePassed = calculateElapsedTime(new Date() - new Date(data.created));
    return (
        <div className="flex gap-4 ">
            <div className="flex flex-col w-full gap-5 mb-5 [&>p]:min-h-20">
                <div>
                    <Link
                        to={"/posts/" + data.id}
                        className={`text-2xl font-semibold hover:text-primary ${onPostPage && "pointer-events-none"}`}
                    >
                        {data.title}
                    </Link>
                    <p className="inline ms-3 mt-auto font-italic text-sm text-[gray]/80"> {timePassed}</p>
                </div>
                <p>{data.content}</p>

                <div className="flex gap-2 mt-auto ">
                    {data.tags.map((tag) => (
                        <TagBlock key={tag.tagName} name={tag.tagName} />
                    ))}
                </div>
            </div>
            <div className="min-w-30 [&_div]:mb-2 ">
                <Avatar text={data.user.username} size={80} url={data.user.profile?.avatarUrl} />
                <h3 className="font-semibold truncate">{data.user.username}</h3>
                <p> {convertedDate.date}</p>
                <p> {convertedDate.time}</p>
            </div>
        </div>
    );
}, areEqual);

function areEqual(prevProps, nextProps) {
    if (prevProps.content !== nextProps.content) return false;
    return true;
}

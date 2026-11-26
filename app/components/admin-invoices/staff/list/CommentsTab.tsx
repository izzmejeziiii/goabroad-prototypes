"use client";

import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { staffUser } from "../../data";
import { Button, Paper } from "../../mui";
import type { InvoiceComment } from "../../types";
import { OutlinedTextField } from "../../results-table/primitives/Input";
import { useSnackbar } from "../../results-table/primitives/Snackbar";
import { formatDistanceToNow } from "./time";

/* Copy of src/views/Client/Invoices/CommentsTab.js and
   src/components/Cards/Comment.js: the invoice's comments oldest first,
   five at a time (Show More / Show Less), each a Card with a 50px red
   initials avatar (theme CardHeader), the name, "x days ago" and, on your
   own comments, a delete button; then the outlined "Add your comment here
   ..." box (Enter posts, Shift+Enter breaks the line). */

const CommentCard = ({
    comment,
    enableDelete,
    onDelete,
}: {
    comment: InvoiceComment;
    enableDelete: boolean;
    onDelete: () => void;
}) => (
    <Paper className="mb-6 overflow-hidden">
        <div className="flex items-center p-4">
            <div className="mr-4 flex flex-[0_0_auto]">
                <div
                    className="flex size-[50px] shrink-0 select-none items-center justify-center overflow-hidden rounded-full text-[1.25rem] leading-none text-white"
                    style={{ backgroundColor: "#f44336" }}
                >
                    {comment.first_name.charAt(0) + comment.last_name.charAt(0)}
                </div>
            </div>
            <div className="flex-[1_1_auto]">
                <span className="block text-[0.875rem] leading-[1.43] tracking-[0.01071em] text-[#424242]">
                    {comment.first_name + " " + comment.last_name}
                </span>
                <span className="block text-[0.875rem] leading-[1.66] tracking-[0.01071em] text-[rgba(0,0,0,0.6)]">
                    {formatDistanceToNow(comment.timestamp)}
                </span>
            </div>
            {enableDelete && (
                <div className="-mb-1 -mr-2 -mt-1 flex-[0_0_auto] self-start">
                    <button
                        type="button"
                        onClick={onDelete}
                        className="inline-flex items-center justify-center rounded-full p-2 text-[rgba(0,0,0,0.54)] transition-colors duration-150 hover:bg-[rgba(0,0,0,0.04)]"
                    >
                        <MdDeleteOutline className="size-6" />
                    </button>
                </div>
            )}
        </div>
        <div className="px-4 pb-6 pt-2">
            <p className="m-0 text-[0.875rem] leading-[1.5] tracking-[0.00938em] text-[#424242]">{comment.message}</p>
        </div>
    </Paper>
);

const CommentsTab = ({
    comments,
    commentsShown,
    onCommentsShownChange,
    onPost,
    onDelete,
}: {
    comments: InvoiceComment[];
    commentsShown: number;
    onCommentsShownChange: (n: number) => void;
    onPost: (text: string) => void;
    onDelete: (comment: InvoiceComment) => void;
}) => {
    const { enqueueSnackbar } = useSnackbar();
    const [commentText, setCommentText] = useState("");
    const [posting, setPosting] = useState(false);

    const post = () => {
        setPosting(true);
        // POST /comments; an empty comment is what the API turns down
        setTimeout(() => {
            if (commentText.trim()) {
                onPost(commentText);
                enqueueSnackbar("Comment has been added!", { variant: "success" });
            } else {
                enqueueSnackbar("Failed to add comment! Please try again.", { variant: "error" });
            }
            setCommentText("");
            setPosting(false);
        }, 300);
    };

    const remove = (comment: InvoiceComment) => {
        setPosting(true);
        setTimeout(() => {
            onDelete(comment);
            enqueueSnackbar("Comment has been deleted!", { variant: "success" });
            setPosting(false);
        }, 300);
    };

    return (
        <div className="flex h-[calc(100%-80px)] flex-col">
            <div>
                {comments.slice(0, commentsShown).map((comment, key) => (
                    <CommentCard
                        key={`comment-${key}`}
                        comment={comment}
                        enableDelete={staffUser.id === comment.user_id}
                        onDelete={() => remove(comment)}
                    />
                ))}
            </div>
            {comments.length > commentsShown && comments.length > 5 && (
                <Button color="primary" fullWidth onClick={() => onCommentsShownChange(commentsShown + 5)}>
                    Show More
                </Button>
            )}
            {comments.length <= commentsShown && comments.length > 5 && (
                <Button color="primary" fullWidth onClick={() => onCommentsShownChange(commentsShown - 5)}>
                    Show Less
                </Button>
            )}
            <div className="flex w-full bg-white pb-0 pt-6">
                <OutlinedTextField
                    className="m-0 mb-6 mt-auto"
                    fullWidth
                    multiline
                    disabled={posting}
                    placeholder="Add your comment here ..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            post();
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default CommentsTab;

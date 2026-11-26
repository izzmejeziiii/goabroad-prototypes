"use client";

/* Copies src/views/Client/Invoices/AddEditInvoice/Comments.js with
   src/components/Cards/Comment.js: the invoice's comments, oldest first,
   as read-only cards (red initials avatar, name, "x days ago"). The
   editor has no box to add one. */

import clsx from "clsx";
import { BODY1, BODY2, Paper, SHADOW } from "../../mui";
import { useInvoices } from "../../store";
import type { InvoiceComment } from "../../types";
import { distanceToNow } from "./utils";

const CommentCard = ({ comment }: { comment: InvoiceComment }) => (
    <div className={clsx("mb-6 overflow-hidden rounded-[4px] bg-white text-[rgba(0,0,0,0.87)]", SHADOW)}>
        <div className="flex items-center p-4">
            <div className="mr-4 flex flex-[0_0_auto]">
                <div className="flex size-[50px] shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-[#f44336] text-[1.25rem] leading-none text-white">
                    {comment.first_name.charAt(0) + comment.last_name.charAt(0)}
                </div>
            </div>
            <div className="flex-[1_1_auto]">
                <span className={clsx(BODY2, "block")}>{comment.first_name + " " + comment.last_name}</span>
                <span className={clsx(BODY2, "block !leading-[1.66] !text-[rgba(0,0,0,0.6)]")}>
                    {distanceToNow(comment.timestamp)}
                </span>
            </div>
        </div>
        <div className="px-4 pb-6 pt-2">
            <p className={clsx(BODY1, "m-0")}>{comment.message}</p>
        </div>
    </div>
);

const Comments = ({ invoiceID }: { invoiceID: number }) => {
    const { getInvoice } = useInvoices();
    // sort=+id
    const comments = [...(getInvoice(invoiceID)?.comments ?? [])].sort((a, b) => a.id - b.id);

    return (
        <Paper className="mb-6 p-6">
            <p className={clsx(BODY1, "m-0 mb-4 !text-[0.75rem] !leading-none !text-[rgba(0,0,0,0.54)]")}>Comments</p>
            <div>
                {comments.length > 0 ? (
                    comments.map((comment, key) => <CommentCard comment={comment} key={`comment-${key}`} />)
                ) : (
                    <p className={clsx(BODY1, "m-0")}>No comments found.</p>
                )}
            </div>
        </Paper>
    );
};

export default Comments;

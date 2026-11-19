import { useState } from 'react';
import CommentWriter from './CommentWriter';
import ReactButtonsComment from './ReactButtonsComment';
import { TimeDiff } from '../../api/functions';
import WriteComment from './WriteComment';
import type { OutCommentType } from './Comments';
import { Edit } from 'lucide-react';
interface PropsType {
  postId: string;
  comment: OutCommentType;
  isForReply?: boolean;
}
function CommentItem({ comment, postId }: PropsType) {
  const [repliesShow, setRepliesShow] = useState(false);
  const [reply, setReply] = useState(false);
  const [update, setUpdate] = useState(false);

  const timeDiffrence = TimeDiff(comment.updatedAt);
  function openReplies() {
    setRepliesShow((prev) => !prev);
  }
  function replyComment() {
    setReply((prev) => !prev);
  }
  function closeReplyComment() {
    setReply(false);
  }
  function closeUpdate() {
    setUpdate(false);
  }
  return (
    <div className="border-2 text-black border-gray-600 p-2 rounded-2xl flex flex-col gap-1 items-start justify-center ">
      <div className="w-full flex flex-row items-center justify-between p-1">
        <CommentWriter user={comment.user} />
        <button
          onClick={() => setUpdate((prev) => !prev)}
          className=" cursor-pointer hover:scale-105 capitalize"
        >
          <Edit size={19} />
        </button>
      </div>
      <div className="p-1 text-sm  w-full">{comment.text}</div>
      <div className="p-1 text-[12px] w-full flexStart gap-2">
        <span className="font-bold w-14"> {timeDiffrence} </span>
        <ReactButtonsComment
          postId={postId}
          id={comment._id}
          replyShow={replyComment}
        />
      </div>
      {reply && (
        <WriteComment comment={comment} closeReply={closeReplyComment} />
      )}
      {comment && update && (
        <WriteComment
          comment={comment}
          forUpdate={true}
          closeUpdate={closeUpdate}
          closeReply={closeReplyComment}
        />
      )}

      {comment.replyComments.length > 0 && (
        <div className="p-1 text-[12px] w-full flexStart gap-2 font-bold text-gray-600">
          <span
            onClick={() => openReplies()}
            className="hover:text-gray-800 cursor-pointer"
          >
            {repliesShow ? 'Hide Replies' : 'Show Replies'}
          </span>
        </div>
      )}

      {repliesShow && comment.replyComments.length > 0 && (
        <div className="w-full flex flex-col gap-4 py-2 pr-1 pl-3">
          {comment.replyComments.map((comment, i) => (
            <CommentItem key={i} comment={comment} postId={postId} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentItem;

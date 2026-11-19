import useAddCommentPost from '../../Queries/Comments/useAddCommentPost';
import useUpdatePostComment from '../../Queries/Comments/useUpdatePostComment';
import type { OutCommentType } from './Comments';

function WriteComment({
  comment,
  postId,
  forUpdate,
  closeReply,
  closeUpdate,
}: {
  postId?: string;
  forUpdate?: boolean;
  comment?: OutCommentType;
  closeReply?: () => void;
  closeUpdate?: () => void;
}) {
  const { addPostComment, isAddingPostComment, errorAddPostComment } =
    useAddCommentPost();
  const { updatePostComment, isUpdatingPostComment, errorUpdatePostComment } =
    useUpdatePostComment();
  function sendComment(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get('comment')?.toString();
    if (postId && text) {
      const dataComment: { text: string; post: string } = {
        text: text,
        post: postId,
      };
      addPostComment(dataComment);
    }

    if (comment && text && closeReply) {
      const dataComment: { text: string; post: string; parent?: string } = {
        text: text,
        post: comment?.post,
        parent: comment._id,
      };
      addPostComment(dataComment);
      closeReply();
    }
    e.currentTarget.reset();
  }
  function updateComment(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get('comment')?.toString();
    if (closeUpdate && forUpdate && text && comment) {
      if (text === comment?.text) {
        closeUpdate();
      } else {
        updatePostComment({ id: comment._id, text: text });
        closeUpdate();
      }
    }
  }
  if (forUpdate && comment && closeUpdate) {
    return (
      <div className="w-full border-2 text-black border-blue-600 p-2 rounded-2xl gap-1 flex flex-col ">
        <form onSubmit={(e) => updateComment(e)}>
          <input
            className="w-full focus:outline-0"
            placeholder="Write your comment . . . . . . . ."
            id="text"
            name="comment"
            defaultValue={comment.text}
          />
          <div className="flexEnd">
            <button
              className="p-1 cursor-pointer rounded-2xl hover:bg-blue-600  hover:text-white capitalize text-blue-600 border-2 border-blue-600 flexCenter "
              role="submit"
            >
              send
            </button>
          </div>
        </form>
      </div>
    );
  }
  if (!forUpdate)
    return (
      <div className="w-full border-2 text-black border-blue-600 p-2 rounded-2xl gap-1 flex flex-col ">
        <form onSubmit={(e) => sendComment(e)}>
          <input
            className="w-full focus:outline-0"
            placeholder="Write your comment . . . . . . . ."
            id="text"
            name="comment"
          />
          <div className="flexEnd">
            <button
              className="p-1 cursor-pointer rounded-2xl hover:bg-blue-600  hover:text-white capitalize text-blue-600 border-2 border-blue-600 flexCenter "
              role="submit"
            >
              send
            </button>
          </div>
        </form>
      </div>
    );
}

export default WriteComment;

import { useEffect } from 'react';
import type { CommentType, User } from '../../../types/types';
import useGetCommentsPost from '../../Queries/Comments/useGetCommentsPost';
import CommentItem from './CommentItem';
import WriteComment from './WriteComment';

export interface OutCommentType {
  _id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  post: string;
  parent: string | null;
  replyComments: OutCommentType[];
}

interface PropsType {
  postId: string;
  setCommentsLoading?: (arg: boolean) => void;
}
function Comments({ postId, setCommentsLoading }: PropsType) {
  const { postCommentsData, isLoadingPostComments, errorPostComments } =
    useGetCommentsPost({ id: postId });
  useEffect(() => {
    if (setCommentsLoading) setCommentsLoading(isLoadingPostComments);
  }, [setCommentsLoading, isLoadingPostComments]);
  function commentsTree(comments: CommentType[] | undefined) {
    if (!comments) return null;
    const map: Record<string, OutCommentType> = {};
    const roots: OutCommentType[] = [];
    comments.forEach((comment) => {
      map[comment._id] = { ...comment, replyComments: [] };
    });
    comments.forEach((comment) => {
      if (comment.parent === null) {
        roots.push(map[comment._id]);
      } else {
        map[comment.parent]?.replyComments.push(map[comment._id]);
      }
    });
    return roots;
  }

  const commentsUsed = commentsTree(postCommentsData?.data);

  return (
    <div className="w-full flex flex-col gap-4 py-2 pr-1 pl-3 border-t-2">
      {commentsUsed?.map((comment, i) => (
        <CommentItem key={i} comment={comment} postId={postId} />
      ))}
      <WriteComment postId={postId} />
    </div>
  );
}

export default Comments;

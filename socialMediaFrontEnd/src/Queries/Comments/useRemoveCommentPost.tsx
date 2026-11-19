import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deletePostCommentsApi } from '../../api/commentsFunction';

function useRemoveCommentPost() {
  const queryClient = useQueryClient();
  const {
    mutate: deletePostComment,
    isPending: isDeletingPostComment,
    error: errorDeletePostComment,
  } = useMutation({
    mutationFn: async ({
      postId,
      reactId,
    }: {
      postId: string;
      reactId: string;
    }) => {
      const res = await deletePostCommentsApi({ id: reactId });
      return { ...res, id: postId };
    },
    onSuccess: (res) => {
      const postId = res.id;
      queryClient.invalidateQueries({ queryKey: ['postComments', postId] });
      toast.success(res.message);
    },
    onError: (res) => {
      toast.error(res.message);
    },
  });
  return {
    deletePostComment,
    isDeletingPostComment,
    errorDeletePostComment,
  };
}

export default useRemoveCommentPost;

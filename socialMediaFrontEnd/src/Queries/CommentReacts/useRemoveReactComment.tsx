import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteReactCommentApi } from '../../api/reactCommentsFunctions';

function useRemoveReactComment() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteCommentReact,
    isPending: isDeletingCommentReacts,
    error: errorDeleteCommentReact,
  } = useMutation({
    mutationFn: async ({
      commentId,
      reactId,
    }: {
      commentId: string;
      reactId: string;
    }) => {
      const res = await deleteReactCommentApi({ id: reactId });
      return { ...res, id: commentId };
    },
    onSuccess: (res) => {
      const commentId = res.id;
      queryClient.invalidateQueries({
        queryKey: [`commentReacts-${commentId}`, commentId],
      });
      queryClient.invalidateQueries({
        queryKey: [`commentReactsUser-${commentId}`, commentId],
      });
      queryClient.invalidateQueries({
        queryKey: [`commentReactsCount-${commentId}`, commentId],
      });
    },
    onError: (res) => {
      toast.error(res.message);
    },
  });
  return {
    deleteCommentReact,
    isDeletingCommentReacts,
    errorDeleteCommentReact,
  };
}

export default useRemoveReactComment;

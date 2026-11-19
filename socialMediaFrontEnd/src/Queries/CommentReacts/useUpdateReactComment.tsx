import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateReactCommentApi } from '../../api/reactCommentsFunctions';

function useUpdateReactComment() {
  const queryClient = useQueryClient();
  const {
    mutate: updateCommentReact,
    isPending: isUpdatingCommentReacts,
    error: errorUpdateCommentReact,
  } = useMutation({
    mutationFn: async ({ id, type }: { id: string; type: string }) => {
      const res = await updateReactCommentApi({ id, type });
      return res;
    },
    onSuccess: (res) => {
      const commentId = res.data.comment;
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
    updateCommentReact,
    isUpdatingCommentReacts,
    errorUpdateCommentReact,
  };
}

export default useUpdateReactComment;

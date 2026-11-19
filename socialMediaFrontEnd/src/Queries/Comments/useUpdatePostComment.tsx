import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updatePostCommentsApi } from '../../api/commentsFunction';

function useUpdatePostComment() {
  const queryClient = useQueryClient();
  const {
    mutate: updatePostComment,
    isPending: isUpdatingPostComment,
    error: errorUpdatePostComment,
  } = useMutation({
    mutationFn: async ({ id, text }: { id: string; text: string }) => {
      const res = await updatePostCommentsApi({ id, text });
      return res;
    },
    onSuccess: (res) => {
      const postId = res.data.post;
      queryClient.invalidateQueries({ queryKey: ['postComments', postId] });
    },
    onError: (res) => {
      toast.error(res.message);
    },
  });
  return {
    updatePostComment,
    isUpdatingPostComment,
    errorUpdatePostComment,
  };
}

export default useUpdatePostComment;

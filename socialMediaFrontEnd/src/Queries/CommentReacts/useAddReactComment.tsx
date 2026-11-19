import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { DataInputReactCommentType } from '../../../types/types';
import { toast } from 'react-toastify';
import { addReactCommentApi } from '../../api/reactCommentsFunctions';

function useAddReactComment() {
  const queryClient = useQueryClient();
  const {
    mutate: addReactComment,
    isPending: isAddingCommentReacts,
    error: errorAddReactComment,
  } = useMutation({
    mutationFn: async (data: DataInputReactCommentType) => {
      const res = await addReactCommentApi(data);
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
    addReactComment,
    isAddingCommentReacts,
    errorAddReactComment,
  };
}

export default useAddReactComment;

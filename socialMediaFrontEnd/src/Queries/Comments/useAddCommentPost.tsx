import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-toastify';
import { addPostCommentsApi } from '../../api/commentsFunction';

function useAddCommentPost() {
  const queryClient = useQueryClient();
  const {
    mutate: addPostComment,
    isPending: isAddingPostComment,
    error: errorAddPostComment,
  } = useMutation({
    mutationFn: async (data: {
      text: string;
      post: string;
      parent?: string;
    }) => {
      const res = await addPostCommentsApi(data);
      return res;
    },
    onSuccess: (res) => {
      const postId = res.data.post;
      queryClient.invalidateQueries({
        queryKey: [`postComments-${postId}`, postId],
      });
      queryClient.invalidateQueries({
        queryKey: [`postCommentsNumber-${postId}`, postId],
      });
    },
    onError: (res) => {
      toast.error(res.message);
    },
  });
  return {
    addPostComment,
    isAddingPostComment,
    errorAddPostComment,
  };
}

export default useAddCommentPost;

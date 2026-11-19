import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPostReactApi } from '../../api/reactPostsFunctions';
import type { DataInputReactPostType } from '../../../types/types';
import { toast } from 'react-toastify';

function useAddReactPost() {
  const queryClient = useQueryClient();
  const {
    mutate: addPostReact,
    isPending: isAddingPostReacts,
    error: errorAddPostReact,
  } = useMutation({
    mutationFn: async (data: DataInputReactPostType) => {
      const res = await addPostReactApi(data);
      return res;
    },
    onSuccess: (res) => {
      const postId = res.data.post;
      queryClient.invalidateQueries({
        queryKey: [`postReacts-${postId}`, postId],
      });
      queryClient.invalidateQueries({
        queryKey: [`postReactsUser-${postId}`, postId],
      });
      queryClient.invalidateQueries({
        queryKey: [`postReactsCount-${postId}`, postId],
      });
    },
    onError: (res) => {
      toast.error(res.message);
    },
  });
  return {
    addPostReact,
    isAddingPostReacts,
    errorAddPostReact,
  };
}

export default useAddReactPost;

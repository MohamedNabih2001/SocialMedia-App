import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePostReactApi } from '../../api/reactPostsFunctions';
import { toast } from 'react-toastify';

function useUpdateReactPost() {
  const queryClient = useQueryClient();
  const {
    mutate: updatePostReact,
    isPending: isUpdatingPostReacts,
    error: errorUpdatePostReact,
  } = useMutation({
    mutationFn: async ({ id, type }: { id: string; type: string }) => {
      const res = await updatePostReactApi({ id, type });
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
    updatePostReact,
    isUpdatingPostReacts,
    errorUpdatePostReact,
  };
}

export default useUpdateReactPost;

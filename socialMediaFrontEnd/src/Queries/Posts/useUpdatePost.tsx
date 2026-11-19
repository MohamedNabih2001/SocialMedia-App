import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePostApi } from '../../api/postFunctions';
import { toast } from 'react-toastify';

function useUpdatePost() {
  const queryClient = useQueryClient();
  const {
    mutate: updatePost,
    isPending: isUpdatingPost,
    error: errorUpdating,
  } = useMutation({
    mutationFn: async ({ data, id }: { data: FormData; id: string }) => {
      const res = await updatePostApi({ data, id });
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['postShow'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (res) => {
      toast.error(res.message);
    },
  });
  return {
    updatePost,
    isUpdatingPost,
    errorUpdating,
  };
}

export default useUpdatePost;

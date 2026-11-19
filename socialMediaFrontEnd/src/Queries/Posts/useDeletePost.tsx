import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deletePostApi } from '../../api/postFunctions';
import { useNavigate } from 'react-router-dom';

function useDeletePost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: deletePost,
    isPending: isDeletingPost,
    error: errorDeletePost,
  } = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await deletePostApi({ id });
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['postShow'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/');
    },
    onError: (res) => {
      toast.error(res.message);
    },
  });
  return {
    deletePost,
    isDeletingPost,
    errorDeletePost,
  };
}

export default useDeletePost;
//deletePostApi

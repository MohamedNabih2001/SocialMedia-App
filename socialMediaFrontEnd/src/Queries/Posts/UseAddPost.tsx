import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPostApi } from '../../api/postFunctions';
import { toast } from 'react-toastify';

function UseAddPost() {
  const queryClient = useQueryClient();
  const {
    mutate: addPost,
    isPending: isAddingPost,
    error: errorAddPost,
  } = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await addPostApi(data);
      return res;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success(res.message);
    },
    onError: (res) => {
      toast.error(res.message);
    },
  });
  return { addPost, isAddingPost, errorAddPost };
}

export default UseAddPost;

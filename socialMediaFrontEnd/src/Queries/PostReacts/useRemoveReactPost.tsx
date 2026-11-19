import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addPostReactApi,
  deletePostReactApi,
} from '../../api/reactPostsFunctions';
import type { DataInputReactPostType } from '../../../types/types';
import { toast } from 'react-toastify';

function useRemoveReactPost() {
  const queryClient = useQueryClient();
  const {
    mutate: deletePostReact,
    isPending: isDeletingPostReacts,
    error: errorDeletePostReact,
  } = useMutation({
    mutationFn: async ({
      postId,
      reactId,
    }: {
      postId: string;
      reactId: string;
    }) => {
      const res = await deletePostReactApi({ id: reactId });
      return { ...res, id: postId };
    },
    onSuccess: (res) => {
      const postId = res.id;
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
    deletePostReact,
    isDeletingPostReacts,
    errorDeletePostReact,
  };
}

export default useRemoveReactPost;

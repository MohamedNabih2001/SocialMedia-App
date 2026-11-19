import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPostCommentsApi } from '../../api/commentsFunction';

//newNotification,newComment,newReactComment,newReactPost

function useGetCommentsPost({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const {
    data: postCommentsData,
    isLoading: isLoadingPostComments,
    error: errorPostComments,
  } = useQuery({
    queryKey: [`postComments-${id}`, id],
    queryFn: () => getPostCommentsApi({ id }),
  });

  return { postCommentsData, isLoadingPostComments, errorPostComments };
}

export default useGetCommentsPost;

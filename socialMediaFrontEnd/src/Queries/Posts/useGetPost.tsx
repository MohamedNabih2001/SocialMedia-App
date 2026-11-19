import { useQuery } from '@tanstack/react-query';
import { getPostApi } from '../../api/postFunctions';

function useGetPost(postId: string | undefined) {
  const {
    data: postData,
    isLoading: isLoadingPost,
    error: errorPostData,
  } = useQuery({
    queryKey: ['postShow', postId],
    queryFn: () => {
      if (!postId) {
        return null;
      }
      return getPostApi({ postId });
    },
  });
  return {
    postData,
    isLoadingPost,
    errorPostData,
  };
}

export default useGetPost;

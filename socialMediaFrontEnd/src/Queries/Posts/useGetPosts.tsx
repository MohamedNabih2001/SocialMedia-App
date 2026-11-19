import { useQuery } from '@tanstack/react-query';
import { getPostsApi, type InputParamsType } from '../../api/postFunctions';

function useGetPosts(params: InputParamsType) {
  console.log('Hook Called');
  const {
    data: postsData,
    isLoading: isLoadingPosts,
    error: errorPostsData,
  } = useQuery({
    queryKey: ['posts', params],
    queryFn: () => getPostsApi({ paramsFilter: params }),
  });
  return {
    postsData,
    isLoadingPosts,
    errorPostsData,
  };
}

export default useGetPosts;

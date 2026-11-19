import { useQuery } from '@tanstack/react-query';
import { getUserPostsApi, type InputParamsType } from '../../api/postFunctions';

function useGetPostsByUser({
  id,
  params,
}: {
  id: string | undefined;
  params: InputParamsType;
}) {
  const {
    data: userPosts,
    isLoading: isLoadingUserPosts,
    error: errorUserPosts,
  } = useQuery({
    queryKey: ['userPosts', id],
    queryFn: async () => {
      if (!id) {
        return null;
      }
      if (id) {
        const res = await getUserPostsApi({ userId: id, params });
        return res;
      }
    },
  });
  return { userPosts, isLoadingUserPosts, errorUserPosts };
}

export default useGetPostsByUser;

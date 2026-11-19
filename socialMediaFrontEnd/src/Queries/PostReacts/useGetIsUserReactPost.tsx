import { useQuery } from '@tanstack/react-query';
import { getIsUserReactPostApi } from '../../api/reactPostsFunctions';

function useGetIsUserReactPost({ id }: { id: string }) {
  const {
    data: isUserReactPostData,
    isLoading: isLoadingIsUserReactPostData,
    error: errorIsUserReactPostData,
  } = useQuery({
    queryKey: [`postReactsUser-${id}`, id],
    queryFn: () => getIsUserReactPostApi({ id }),
  });
  return {
    isUserReactPostData,
    isLoadingIsUserReactPostData,
    errorIsUserReactPostData,
  };
}

export default useGetIsUserReactPost;

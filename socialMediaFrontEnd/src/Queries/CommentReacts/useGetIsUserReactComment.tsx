import { useQuery } from '@tanstack/react-query';
import { getIsUserReactCommentApi } from '../../api/reactCommentsFunctions';

function useGetIsUserReactComment({ id }: { id: string }) {
  const {
    data: isUserReactCommentData,
    isLoading: isLoadingIsUserReactCommentData,
    error: errorIsUserReactCommentData,
  } = useQuery({
    queryKey: [`commentReactsUser-${id}`, id],
    queryFn: () => getIsUserReactCommentApi({ id }),
  });
  return {
    isUserReactCommentData,
    isLoadingIsUserReactCommentData,
    errorIsUserReactCommentData,
  };
}

export default useGetIsUserReactComment;

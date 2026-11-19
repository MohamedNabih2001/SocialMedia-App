import { useQuery } from '@tanstack/react-query';
import { getReactCommentCountApi } from '../../api/reactCommentsFunctions';

function useGetReactCommentCount({ id }: { id: string }) {
  const {
    data: commentReactsCount,
    isLoading: isLoadingCommentReactsCount,
    error: errorCommentReactsCount,
  } = useQuery({
    queryKey: [`commentReactsCount-${id}`, id],
    queryFn: () => getReactCommentCountApi({ id }),
  });
  return {
    commentReactsCount,
    isLoadingCommentReactsCount,
    errorCommentReactsCount,
  };
}

export default useGetReactCommentCount;

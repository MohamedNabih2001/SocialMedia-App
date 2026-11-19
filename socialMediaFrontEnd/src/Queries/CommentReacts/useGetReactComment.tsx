import { useQuery } from '@tanstack/react-query';
import { getReactCommentApi } from '../../api/reactCommentsFunctions';

function useGetCommentReacts({ id }: { id: string }) {
  const {
    data: commentReactsData,
    isLoading: isLoadingCommentReacts,
    error: errorCommentReacts,
  } = useQuery({
    queryKey: [`commentReacts-${id}`, id],
    queryFn: () => getReactCommentApi({ id }),
  });
  return { commentReactsData, isLoadingCommentReacts, errorCommentReacts };
}

export default useGetCommentReacts;

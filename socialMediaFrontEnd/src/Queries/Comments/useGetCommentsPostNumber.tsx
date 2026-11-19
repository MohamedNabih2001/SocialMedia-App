import { useQuery } from '@tanstack/react-query';
import { getPostCommentsNumberApi } from '../../api/commentsFunction';

function useGetCommentsPostNumber({ id }: { id: string }) {
  const {
    data: postCommentsNumber,
    isLoading: isLoadingPostCommentsNumber,
    error: errorPostCommentsNumber,
  } = useQuery({
    queryKey: [`postCommentsNumber-${id}`, id],
    queryFn: () => getPostCommentsNumberApi({ id }),
  });

  return {
    postCommentsNumber,
    isLoadingPostCommentsNumber,
    errorPostCommentsNumber,
  };
}

export default useGetCommentsPostNumber;

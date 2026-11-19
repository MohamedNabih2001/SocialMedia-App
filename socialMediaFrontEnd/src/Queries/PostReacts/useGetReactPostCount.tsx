import { useQuery } from '@tanstack/react-query';
import { getPostReactCountApi } from '../../api/reactPostsFunctions';

function useGetReactPostCount({ id }: { id: string }) {
  const {
    data: postReactsCount,
    isLoading: isLoadingPostReactsCount,
    error: errorPostReactsCount,
  } = useQuery({
    queryKey: [`postReactsCount-${id}`, id],
    queryFn: () => getPostReactCountApi({ id }),
  });
  return {
    postReactsCount,
    isLoadingPostReactsCount,
    errorPostReactsCount,
  };
}

export default useGetReactPostCount;

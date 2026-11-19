import { useQuery } from '@tanstack/react-query';
import { getPostReactApi } from '../../api/reactPostsFunctions';

function useGetReactPost({ id }: { id: string }) {
  const {
    data: postReactsData,
    isLoading: isLoadingPostReacts,
    error: errorPostReacts,
  } = useQuery({
    queryKey: [`postReacts-${id}`, id],
    queryFn: () => getPostReactApi({ id }),
  });
  return { postReactsData, isLoadingPostReacts, errorPostReacts };
}

export default useGetReactPost;

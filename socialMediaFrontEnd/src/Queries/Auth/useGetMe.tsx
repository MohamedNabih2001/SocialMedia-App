import { useQuery } from '@tanstack/react-query';
import { getMeApi } from '../../api/authFunctions';

function useGetMe() {
  const {
    data: meData,
    isLoading: isLoadingMe,
    error: meError,
  } = useQuery({
    queryKey: ['me'],
    queryFn: getMeApi,
  });
  return { meData, isLoadingMe, meError };
}

export default useGetMe;

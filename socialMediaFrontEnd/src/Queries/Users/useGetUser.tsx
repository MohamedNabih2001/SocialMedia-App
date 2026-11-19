import { useQuery } from '@tanstack/react-query';
import { getAnyUserApi } from '../../api/userFunctions';

function useGetUser(userId: string | undefined) {
  console.log('this one called');
  const {
    data: userData,
    isLoading: isLoadingUserData,
    error: errorUserData,
  } = useQuery({
    queryKey: ['userData', userId],
    queryFn: () => {
      if (!userId) {
        return null;
      }
      return getAnyUserApi({ id: userId });
    },
  });
  return {
    userData,
    isLoadingUserData,
    errorUserData,
  };
}

export default useGetUser;

import { useQuery } from '@tanstack/react-query';
import { getUserFriendsApi } from '../../api/friendsFunctions';

function useGetFriends() {
  const {
    data: friendsData,
    isLoading: isLoadingFriendsData,
    error: errorFriendsData,
  } = useQuery({
    queryKey: ['friends'],
    queryFn: getUserFriendsApi,
  });
  return {
    friendsData,
    isLoadingFriendsData,
    errorFriendsData,
  };
}

export default useGetFriends;
//

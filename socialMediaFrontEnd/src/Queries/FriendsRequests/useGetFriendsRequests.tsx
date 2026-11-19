import { useQuery } from '@tanstack/react-query';
import { getUserFriendRequestsApi } from '../../api/friendsFunctions';

function useGetFriendsRequests() {
  const {
    data: friendsRequestsData,
    isLoading: isLoadingFriendsRequestsData,
    error: errorFriendsRequestsData,
  } = useQuery({
    queryKey: ['friendsRequests'],
    queryFn: getUserFriendRequestsApi,
  });
  return {
    data: friendsRequestsData,
    isLoading: isLoadingFriendsRequestsData,
    error: errorFriendsRequestsData,
  };
}

export default useGetFriendsRequests;

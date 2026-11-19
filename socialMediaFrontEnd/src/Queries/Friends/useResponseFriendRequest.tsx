import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { responseFriendRequestApi } from '../../api/friendsFunctions';

function useResponseFriendRequest() {
  const queryClient = useQueryClient();
  const {
    mutate: responseFriendRequest,
    isPending: isResponsingFriendRequest,
    error: errorResponseFriendRequest,
  } = useMutation({
    mutationFn: async ({
      requestId,
      type,
    }: {
      requestId: string;
      type: string;
    }) => {
      const res = await responseFriendRequestApi({ requestId, type });
      return res;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['isFriend'] });
      queryClient.invalidateQueries({ queryKey: ['friends'] });
      queryClient.invalidateQueries({ queryKey: ['Notifications'] });
      queryClient.invalidateQueries({ queryKey: ['friendsRequests'] });
      toast.success(res.message);
    },
    onError: (res) => {
      toast.error(res.message);
    },
  });
  return {
    responseFriendRequest,
    isResponsingFriendRequest,
    errorResponseFriendRequest,
  };
}

export default useResponseFriendRequest;

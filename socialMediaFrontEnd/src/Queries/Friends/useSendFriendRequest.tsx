import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendFriendRequestApi } from '../../api/friendsFunctions';
import { toast } from 'react-toastify';

function useSendFriendRequest() {
  const queryClient = useQueryClient();
  const {
    mutate: sendFriendRequest,
    isPending: isSendingFriendRequest,
    error: errorSendFriendRequest,
  } = useMutation({
    mutationFn: async ({ receiver }: { receiver: string }) => {
      const res = await sendFriendRequestApi({ receiver });
      return res;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['isFriend'] });
      toast.success(res.message);
    },
    onError: (res) => {
      toast.error(res.message);
    },
  });
  return {
    sendFriendRequest,
    isSendingFriendRequest,
    errorSendFriendRequest,
  };
}

export default useSendFriendRequest;

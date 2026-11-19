import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFriendApi } from '../../api/friendsFunctions';
import { toast } from 'react-toastify';

function useRemoveFriend() {
  const queryClient = useQueryClient();
  const {
    mutate: removeFriend,
    isPending: isRemovingFriend,
    error: errorRemoveFriend,
  } = useMutation({
    mutationFn: async ({ friendId }: { friendId: string }) => {
      const res = await removeFriendApi({ friendId });
      return res;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['isFriend'] });
      queryClient.invalidateQueries({ queryKey: ['friends'] });
      toast.success(res.message);
    },
    onError: (res) => {
      toast.error(res.message);
    },
  });
  return {
    removeFriend,
    isRemovingFriend,
    errorRemoveFriend,
  };
}

export default useRemoveFriend;

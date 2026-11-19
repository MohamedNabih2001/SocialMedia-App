import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeNotificationsRead } from '../../api/notificationsFunctions';
import { toast } from 'react-toastify';

function useMakeNotificationRead() {
  const queryClient = useQueryClient();
  const {
    mutate: makeRead,
    isPending: isLoadingMakeRead,
    error: erroMakeRead,
  } = useMutation({
    mutationFn: async ({ id }: { id: string | undefined }) => {
      if (!id) return null;
      if (id) {
        const res = await makeNotificationsRead({ id });
        return res;
      }
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['Notifications'] });
      toast.success(res?.message);
    },
    onError: (res) => {
      toast.error(res?.message);
    },
  });
  return {
    makeRead,
    isLoadingMakeRead,
    erroMakeRead,
  };
}

export default useMakeNotificationRead;

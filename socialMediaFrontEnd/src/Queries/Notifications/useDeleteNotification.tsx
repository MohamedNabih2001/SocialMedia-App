import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteNotificationsApi } from '../../api/notificationsFunctions';

function useDeleteNotification() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteNotification,
    isPending: isLoadingDeletingNotification,
    error: errorDeleteNotificaion,
  } = useMutation({
    mutationFn: async ({ id }: { id: string | undefined }) => {
      if (!id) return null;
      if (id) {
        const res = await deleteNotificationsApi({ id });
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
    deleteNotification,
    isLoadingDeletingNotification,
    errorDeleteNotificaion,
  };
}

export default useDeleteNotification;

import { useQuery } from '@tanstack/react-query';
import { getNotificationsApi } from '../../api/notificationsFunctions';

function useGetNotifications() {
  const {
    data: notificationsData,
    isLoading: isLoadingNotificationsData,
    error: errorNotificationsData,
  } = useQuery({
    queryKey: ['Notifications'],
    queryFn: getNotificationsApi,
  });
  return {
    notificationsData,
    isLoadingNotificationsData,
    errorNotificationsData,
  };
}

export default useGetNotifications;

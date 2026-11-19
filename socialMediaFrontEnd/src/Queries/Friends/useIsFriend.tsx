import { useQuery } from '@tanstack/react-query';
import { isFriendApi } from '../../api/friendsFunctions';

function useIsFriend({ reciever }: { reciever: string | undefined }) {
  const {
    data: isFriendData,
    isLoading: isFriendDataLoading,
    error: isFriendDataError,
  } = useQuery({
    queryKey: ['isFriend', reciever],
    queryFn: () => {
      if (reciever) {
        return isFriendApi({ reciever });
      }
      if (!reciever) {
        console.log('There is problem ');
        return null;
      }
    },
  });
  return {
    isFriendData,
    isFriendDataLoading,
    isFriendDataError,
  };
}

export default useIsFriend;

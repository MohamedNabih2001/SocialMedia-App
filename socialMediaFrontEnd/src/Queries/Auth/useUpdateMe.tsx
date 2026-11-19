import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMeApi } from '../../api/authFunctions';
import { toast } from 'react-toastify';
import useGetMe from './useGetMe';

function useUpdateMe() {
  const queryClient = useQueryClient();
  const { meData } = useGetMe();
  const id = meData?.data._id || '';
  const {
    mutate: updateMe,
    isPending: isUpdatingMe,
    error: updateMeError,
  } = useMutation({
    mutationKey: ['me'],
    mutationFn: (data: FormData) => {
      const res = updateMeApi({ data, id });
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ['me'],
      });
    },
    onError: (res) => {
      toast.success(res.message);
    },
  });
  return { updateMe, isUpdatingMe, updateMeError };
}

export default useUpdateMe;

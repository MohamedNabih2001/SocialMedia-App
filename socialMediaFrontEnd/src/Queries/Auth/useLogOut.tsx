import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutApi } from '../../api/authFunctions';
import { toast } from 'react-toastify';
import { useAppSMDispatch } from '../../redux/hooks';
import { logOut, signIn } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function useLogOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useAppSMDispatch();
  const {
    mutate: logoutFromApp,
    isPending: isLogingOut,
    error: logoutError,
  } = useMutation({
    mutationFn: () => {
      const res = logoutApi();
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ['me'],
      });
      dispatch(logOut());
      navigate('/');
    },
    onError: (res) => {
      toast.success(res.message);
    },
  });
  return { logoutFromApp, isLogingOut, logoutError };
}

export default useLogOut;

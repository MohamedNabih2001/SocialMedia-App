import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginApi } from '../../api/authFunctions';
import { toast } from 'react-toastify';
import { useAppSMDispatch } from '../../redux/hooks';
import { logOut, signIn } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import type { SignInInput } from '../../../types/types';

function useSignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useAppSMDispatch();
  const {
    mutate: signInFromApp,
    isPending: isSigningIn,
    error: signInError,
  } = useMutation({
    mutationKey: ['me'],
    mutationFn: (data: SignInInput) => {
      const res = loginApi(data);
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ['me'],
      });
      const inputData = {
        token: res.data.token,
        name: res.data.name,
        role: res.data.role,
        email: res.data.email,
        theme: res.data.theme,
      };
      dispatch(signIn(inputData));
      navigate('/');
    },
    onError: (res) => {
      toast.success(res.message);
      dispatch(logOut());
    },
  });
  return { signInFromApp, isSigningIn, signInError };
}

export default useSignIn;

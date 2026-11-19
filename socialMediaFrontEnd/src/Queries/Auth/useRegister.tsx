import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerApi } from '../../api/authFunctions';
import type { RegisterDataInput } from '../../../types/types';
import { toast } from 'react-toastify';
import { useAppSMDispatch } from '../../redux/hooks';
import { logOut, signIn } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useAppSMDispatch();
  const {
    mutate: signUp,
    isPending: isRegistering,
    error: registerError,
  } = useMutation({
    mutationKey: ['me'],
    mutationFn: (data: FormData) => {
      const res = registerApi(data);
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
        theme: 'light',
      };
      dispatch(signIn(inputData));
      navigate('/');
    },
    onError: (res) => {
      toast.success(res.message);
      dispatch(logOut());
    },
  });
  return { signUp, isRegistering, registerError };
}

export default useRegister;

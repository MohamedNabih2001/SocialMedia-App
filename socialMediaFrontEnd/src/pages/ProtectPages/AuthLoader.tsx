import { useEffect, useRef, type ReactNode } from 'react';
import { useAppSMDispatch } from '../../redux/hooks';
import { logOut, setLoading } from '../../redux/userSlice';
import { refreshToken } from '../../redux/userSlice';

interface Propstype {
  children: ReactNode;
}
function AuthLoader({ children }: Propstype) {
  const dispatch = useAppSMDispatch();

  const didRun = useRef(false);
  useEffect(
    function () {
      async function refresh() {
        didRun.current = true;
        try {
          dispatch(setLoading(true));
          await dispatch(refreshToken()).unwrap();
        } catch (err) {
          console.log(err);
          dispatch(logOut());
        } finally {
          dispatch(setLoading(false));
        }
      }
      if (didRun.current) {
        return;
      } else {
        refresh();
      }
    },
    [dispatch]
  );
  return children;
}

export default AuthLoader;

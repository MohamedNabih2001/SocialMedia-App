import type { ReactNode } from 'react';
import { useAppSMSelector } from '../../redux/hooks';
import { Navigate } from 'react-router-dom';

interface PropsType {
  children: ReactNode;
}
function ProtectPage({ children }: PropsType) {
  const user = useAppSMSelector((state) => state.user);
  if (!user.isAuth) {
    return <Navigate to={'/'} />;
  } else {
    return children;
  }
}

export default ProtectPage;

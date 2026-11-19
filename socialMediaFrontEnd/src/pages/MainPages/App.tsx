import { Outlet } from 'react-router-dom';
import Spinner from '../../components/global/Spinner';
import { useAppSMSelector } from '../../redux/hooks';
import Modal from '../../components/global/Modal';
import { useEffect } from 'react';
import useSocket from '../../api/useSocket';
import CalledUseSocket from '../AuthPages/CalledUseSocket';

function App() {
  const userData = useAppSMSelector((state) => state.user);
  useEffect(() => {
    if (userData && userData.isAuth) {
      const isDarkMode = document.documentElement.classList.contains('dark');
      if (!isDarkMode && userData.user?.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (isDarkMode && userData.user?.theme === 'light') {
        document.documentElement.classList.remove('dark');
      } else if (!isDarkMode && userData.user?.theme === 'light') {
        return;
      }
    }
  }, [userData, userData.isAuth]);
  if (userData.loading === true || userData.loading === null) {
    return <Spinner sizeSpin={20} />;
  }
  if (userData.isAuth) {
    return (
      <div className="h-screen w-full bg-white text-black overflow-y-auto ">
        <CalledUseSocket />
        <Modal />
        <Outlet />
      </div>
    );
  }
  if (!userData.isAuth) {
    return (
      <div className="min-h-screen w-full relative ">
        <Outlet />
      </div>
    );
  }
}

export default App;

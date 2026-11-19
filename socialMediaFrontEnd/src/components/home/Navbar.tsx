import { Bell, MessageCircleMore, Users } from 'lucide-react';
import Logo from '../global/Logo';
import Profile from './Profile';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Notification from '../notification/Notification';
import NotificationsContainer from '../notification/NotificationsContainer';
import { useAppSMDispatch } from '../../redux/hooks';
import { closeModalFunction, openModalFunction } from '../../redux/modalSlice';
import useGetNotifications from '../../Queries/Notifications/useGetNotifications';

function Navbar() {
  const dispatch = useAppSMDispatch();
  const [notificationShow, setNotificationShow] = useState(false);
  const expectNotification = useRef<HTMLDivElement | null>(null);
  const {
    notificationsData,
    isLoadingNotificationsData,
    errorNotificationsData,
  } = useGetNotifications();
  const notificatinNumber =
    notificationsData?.data?.filter((not) => not?.isRead === false).length || 0;
  const messageNumber = 0;
  function closeModel() {
    dispatch(closeModalFunction());
  }
  function closeNotification() {
    setNotificationShow(false);
  }
  function openModel({ type }: { type: string }) {
    dispatch(openModalFunction({ type: type }));
    setNotificationShow(false);
  }

  return (
    <>
      <div className="w-full p-2 flex flex-row justify-between items-center">
        <div className="w-full">
          <Logo />
        </div>
        <div className="w-full flexCenter">
          <div
            onClick={() => openModel({ type: 'AddingPost' })}
            className="md:w-[60%] flexCenter cursor-pointer p-0.5 gap-2 border-2 rounded-3xl border-gray-300 hover:scale-105 hover:border-gray-600 animation"
          >
            <span className="flexCenter text-md pointer-events-none">
              What do you think ??
            </span>
          </div>
        </div>
        <div className=" w-full flexEnd gap-5">
          <div ref={expectNotification} className="flexCenter relative ">
            <Bell
              className="peer cursor-pointer hover:scale-110 hover:text-blue-500 animation"
              onClick={() => {
                setNotificationShow((prev) => !prev);
              }}
              size={20}
            />
            {notificatinNumber > 0 && (
              <span
                onClick={() => setNotificationShow((prev) => !prev)}
                className="absolute cursor-pointer peer-hover:scale-110  hover:scale-110 animation top-[-70%] left-[-20%] w-5 h-5 text-sm rounded-full flexCenter bg-blue-300"
              >
                {notificatinNumber}
              </span>
            )}
            {notificationShow && notificationsData && (
              <NotificationsContainer
                expect={expectNotification}
                closeNotification={closeNotification}
              >
                {notificationsData.data.map((notif, i) => (
                  <Notification
                    key={i}
                    data={notif}
                    closeNotification={closeNotification}
                  />
                ))}
              </NotificationsContainer>
            )}
          </div>
          <Link
            to="/friends"
            className="flexCenter cursor-pointer hover:scale-110 hover:text-blue-500 animation"
          >
            <Users size={20} />
          </Link>

          <div className="flexCenter ">
            <Profile />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

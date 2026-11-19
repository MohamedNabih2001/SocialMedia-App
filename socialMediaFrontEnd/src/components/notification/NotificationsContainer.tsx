import { useRef, type ReactNode, type RefObject } from 'react';
import useCloseClickOutSide from '../global/useCloseClickOutSide';
interface PropsType {
  closeNotification: () => void;
  children: ReactNode;
  expect?: RefObject<HTMLDivElement | null>;
}
function NotificationsContainer({
  expect,
  closeNotification,
  children,
}: PropsType) {
  const NotiRef = useRef<HTMLDivElement | null>(null);

  useCloseClickOutSide({
    ref: NotiRef,
    closeFunction: closeNotification,
    expect,
  });

  return (
    <div
      ref={NotiRef}
      className="absolute top-[120%] left-[-1000%] w-60 h-120 p-1 text-sm rounded-xl flex flex-col justify-start items-center bg-gray-200 overflow-x-hidden overflow-y-auto"
    >
      {children}
    </div>
  );
}

export default NotificationsContainer;

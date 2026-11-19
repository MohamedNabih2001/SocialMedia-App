import { MailCheck, Trash2 } from 'lucide-react';
import { useAppSMDispatch } from '../../redux/hooks';
import { openModalFunction } from '../../redux/modalSlice';
import type { NotificationType } from '../../../types/types';
import useMakeNotificationRead from '../../Queries/Notifications/useMakeNotificationRead';
import useResponseFriendRequest from '../../Queries/Friends/useResponseFriendRequest';
import useDeleteNotification from '../../Queries/Notifications/useDeleteNotification';

const typeNotification = [
  'friendRequest',
  'friendAccept',
  'friendReject',
  'postReact',
  'commentReact',
  'postComment',
  'commentReply',
];
interface PropsType {
  data: NotificationType;
  closeNotification?: () => void;
}
function Notification({ data, closeNotification }: PropsType) {
  const dispatch = useAppSMDispatch();
  const isRead = data.isRead;
  function openModel() {
    if (data.post) dispatch(openModalFunction({ type: 'Post', id: data.post }));
    if (closeNotification) closeNotification();
  }
  const typeNotification = data.type;
  const { makeRead, isLoadingMakeRead, erroMakeRead } =
    useMakeNotificationRead();
  const {
    responseFriendRequest,
    isResponsingFriendRequest,
    errorResponseFriendRequest,
  } = useResponseFriendRequest();
  const {
    deleteNotification,
    isLoadingDeletingNotification,
    errorDeleteNotificaion,
  } = useDeleteNotification();
  if (data && typeNotification === 'friendRequest') {
    return (
      <div
        className={`w-50 p-2  border-b-2 flex flex-col justify-center items-center gap-3 ${!isRead && 'bg-gray-100'}`}
      >
        <div className="w-full flexStart gap-3  ">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={data?.sender?.image.imageUrl}
              alt="profile"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-full flex flex-col gap-2 justify-center items-start">
            <h2 className="text-sm font-semibold capitalize text-gray-950">
              {data.sender.firstName} {data.sender.lastName}
            </h2>
            <p className="text-[11px] capitalize text-gray-950">
              Send friend Request
            </p>
          </div>
        </div>
        <div className="w-full flexCenter gap-3 ">
          <button
            onClick={() =>
              responseFriendRequest({
                requestId: data.sender._id,
                type: 'accept',
              })
            }
            className="bg-gray-50 capitalize p-1 rounded-xl text-blue-500 hover:scale-110 hover:bg-blue-500 hover:text-gray-50 animation cursor-pointer"
          >
            Accept
          </button>
          <button
            onClick={() =>
              responseFriendRequest({
                requestId: data.sender._id,
                type: 'reject',
              })
            }
            className="bg-gray-50 p-1 capitalize rounded-xl text-red-500 hover:scale-110 hover:bg-red-500 hover:text-gray-50 animation cursor-pointer"
          >
            Reject
          </button>
        </div>
        {!isRead && data && (
          <div className="w-full flexEnd p-1">
            <button
              onClick={() => makeRead({ id: data._id })}
              className="text-black p-1 cursor-pointer bg-gray-300 rounded-2xl animation hover:scale-110"
            >
              <MailCheck size={20} />
            </button>
          </div>
        )}
      </div>
    );
  }
  if (
    typeNotification === 'friendAccept' ||
    typeNotification === 'friendReject'
  ) {
    return (
      <div
        className={`w-50 p-2 border-b-2 relative flex flex-col justify-center items-center gap-3 cursor-pointer hover:bg-gray-300 ${!isRead && 'bg-gray-100'}`}
      >
        <div className="flexStart gap-3 ">
          <button
            disabled={isLoadingDeletingNotification}
            onClick={() => deleteNotification({ id: data._id })}
            className={`${isLoadingDeletingNotification ? 'pointer-events-none' : ''} absolute top-1 right-0 p-1 hover:text-red-500 animation cursor-pointer `}
          >
            <Trash2
              className={`${isLoadingDeletingNotification ? 'pointer-events-none' : ''}`}
              size={17}
            />
          </button>
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={data.sender.image.imageUrl}
              alt="profile"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-full flex flex-col gap-2 justify-center items-start">
            <h2 className="text-sm font-semibold capitalize text-gray-950">
              {data.sender.firstName} {data.sender.lastName}
            </h2>
            <p className="text-[11px] capitalize text-gray-950">
              {data.type === 'friendAccept'
                ? ' Accepted friend Request'
                : ' Rejected friend Request'}
            </p>
          </div>
        </div>
        {!isRead && (
          <div className="w-full flexEnd p-1">
            <button
              onClick={() => makeRead({ id: data._id })}
              className="text-black p-1 cursor-pointer bg-gray-300 rounded-2xl animation hover:scale-110"
            >
              <MailCheck size={20} />
            </button>
          </div>
        )}
      </div>
    );
  }

  if (typeNotification === 'postReact' || typeNotification === 'commentReact') {
    return (
      <div
        className={`w-50 p-2 border-b-2 flex flex-col justify-center items-center gap-3 relative ${!isRead && 'bg-gray-100'}`}
      >
        <button
          disabled={isLoadingDeletingNotification}
          onClick={() => deleteNotification({ id: data._id })}
          className="absolute top-1 right-0 p-1 hover:text-red-500 animation cursor-pointer"
        >
          <Trash2 size={17} />
        </button>
        <div className="flexStart gap-3 ">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={data?.sender?.image?.imageUrl}
              alt="profile"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-full flex flex-col gap-2 justify-center items-start">
            <h2 className="text-sm font-semibold capitalize text-gray-950">
              {data?.sender?.firstName} {data?.sender?.lastName}
            </h2>
            <p className="text-[11px] capitalize text-gray-950">
              {typeNotification === 'commentReact'
                ? 'React on your comment in this post'
                : 'React with your post'}
            </p>
          </div>
        </div>
        <div className="w-full flex flex-row justify-between items-centers p-1">
          <button
            onClick={() => openModel()}
            className="text-black p-1 font-semibold capitalize cursor-pointer bg-gray-300 rounded-2xl animation hover:scale-105"
          >
            show post
          </button>
          {!isRead && (
            <button
              onClick={() => makeRead({ id: data._id })}
              className="text-black p-1 cursor-pointer bg-gray-300 rounded-2xl animation hover:scale-110"
            >
              <MailCheck size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }
  if (
    typeNotification === 'postComment' ||
    typeNotification === 'commentReply'
  ) {
    return (
      <div
        className={`w-50 relative p-2 border-b-2 flex flex-col justify-center items-center gap-3 ${!isRead && 'bg-gray-100'}`}
      >
        <button
          disabled={isLoadingDeletingNotification}
          onClick={() => deleteNotification({ id: data._id })}
          className="absolute top-1 right-0 p-1 hover:text-red-500 animation cursor-pointer"
        >
          <Trash2 size={17} />
        </button>
        <div className="flexStart gap-3 ">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={data?.sender?.image?.imageUrl}
              alt="profile"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-full flex flex-col gap-2 justify-center items-start">
            <h2 className="text-sm font-semibold capitalize text-gray-950">
              {data?.sender?.firstName} {data?.sender?.lastName}
            </h2>
            <p className="text-[11px]  text-gray-950">
              Write a comment for you
            </p>
          </div>
        </div>
        <div className="w-full flex flex-row justify-between items-centers p-1">
          <button
            onClick={() => openModel()}
            className="text-black p-1 font-semibold capitalize cursor-pointer bg-gray-300 rounded-2xl animation hover:scale-105"
          >
            show post
          </button>
          {!isRead && (
            <button
              onClick={() => makeRead({ id: data._id })}
              className="text-black p-1 cursor-pointer bg-gray-300 rounded-2xl animation hover:scale-110"
            >
              <MailCheck size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Notification;

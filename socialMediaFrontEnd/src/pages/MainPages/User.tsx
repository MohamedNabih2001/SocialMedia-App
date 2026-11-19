import { useParams } from 'react-router-dom';
import BackToHome from '../../components/global/BackToHome';
import Posts from '../../components/post/Posts';
import useGetUser from '../../Queries/Users/useGetUser';
import Spinner from '../../components/global/Spinner';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserPostsApi } from '../../api/postFunctions';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import useSendFriendRequest from '../../Queries/Friends/useSendFriendRequest';
import { toast } from 'react-toastify';
import useIsFriend from '../../Queries/Friends/useIsFriend';
import useRemoveFriend from '../../Queries/Friends/useRemoveFriend';

function User() {
  const params = useParams();
  const { ref, inView } = useInView();

  const id = params.id?.toString();
  const paramsUsed = { limit: 6 };
  const { isFriendData, isFriendDataLoading, isFriendDataError } = useIsFriend({
    reciever: id,
  });
  console.log(isFriendData);
  const { userData, isLoadingUserData, errorUserData } = useGetUser(id);
  const { sendFriendRequest, isSendingFriendRequest, errorSendFriendRequest } =
    useSendFriendRequest();
  const { removeFriend, isRemovingFriend, errorRemoveFriend } =
    useRemoveFriend();

  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['userPosts', id],
      queryFn: ({ pageParam }) =>
        getUserPostsApi({ pageParam, userId: id, params: paramsUsed }),
      initialPageParam: 1,
      enabled: !!id,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        if (!lastPage) return null;
        const currentPage = lastPage.currentPage;
        const totalPages = lastPage.totalPages;
        if (currentPage < totalPages) {
          return currentPage + 1;
        } else {
          return null;
        }
      },
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const isLoading = isSendingFriendRequest || isRemovingFriend;

  if (isLoadingUserData) {
    return (
      <div className="w-full flexCenter p-2">
        <Spinner />
      </div>
    );
  }
  if (userData && id) {
    return (
      <div className="w-full p-2 flex flex-col items-center justify-center gap-3">
        <div className="w-full p-2 flex flex-col items-center justify-center gap-3">
          <div className=" w-full capitalize text-3xl font-semibold text-center">
            Profile page {userData.data.firstName} {userData.data.lastName}
          </div>
          <div className="  w-full capitalize text-start">
            <BackToHome />
          </div>
        </div>
        <div className="w-full grid grid-cols-[3fr_5fr]">
          <div className="w-full flex flex-col justify-center items-center gap-4 self-start">
            <div className=" w-fit h-90 flexCenter overflow-hidden rounded-2xl shadow-xl">
              <img
                className="w-full h-full object-contain object-top "
                src={userData?.data?.image?.imageUrl}
                alt=" fullProfile photo"
              />
            </div>
            {isFriendData && isFriendData?.data.isFriend === 'notFriend' && (
              <div className="w-full text-md flexCenter font-semibold capitalize">
                <button
                  disabled={isLoading}
                  onClick={() => {
                    if (id) sendFriendRequest({ receiver: id });
                    if (!id) toast.error('Can`t send request this is problem ');
                  }}
                  className="p-2 disableBtn cursor-pointer hover:bg-green-600 hover:text-white rounded-2xl border-2 border-green-600 text-green-600 "
                >
                  Send Friend Request
                </button>
              </div>
            )}
            {isFriendData && isFriendData?.data.isFriend === 'friend' && (
              <div className="w-full text-md flexCenter gap-2 font-semibold capitalize">
                Friend
                <button
                  disabled={isLoading}
                  onClick={() => removeFriend({ friendId: id })}
                  className="p-2 disableBtn cursor-pointer hover:bg-red-600 hover:text-white rounded-2xl border-2 border-red-600 text-red-600 "
                >
                  Remove friend
                </button>
              </div>
            )}
            {isFriendData && isFriendData?.data.isFriend === 'requestSend' && (
              <div className="w-full text-md flexCenter font-semibold capitalize">
                <div className="p-2 rounded-2xl border-2 border-gray-600 text-gray-600 ">
                  request is Sent
                </div>
              </div>
            )}
            <div className="w-full text-md flexCenter font-semibold capitalize">
              Name : {userData?.data?.firstName} {userData?.data?.lastName}
            </div>
            <div className="w-full text-md flexCenter font-semibold capitalize">
              role : {userData?.data?.role}
            </div>
            <div className="w-full text-md flexCenter font-semibold capitalize">
              age : {userData?.data?.age}
            </div>
          </div>
          <div className="w-full  self-start">
            {isFetching && (
              <div className="w-full flexCenter p-2">
                <Spinner />
              </div>
            )}
            {data &&
              data.pages &&
              data.pages.map((page, i) => {
                if (page) return <Posts key={i} postsData={page} />;
                if (!page) return null;
              })}
            {!isFetching && hasNextPage && (
              <div
                ref={ref}
                className="w-full h-1 capitalize text-lg flexCenter"
              ></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default User;

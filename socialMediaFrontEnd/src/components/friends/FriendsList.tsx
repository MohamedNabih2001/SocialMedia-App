import { useSearchParams } from 'react-router-dom';
import Pagination from '../global/Pagination';
import ProfileUserFriend from '../global/ProfileUserFriend';
import useGetFriends from '../../Queries/Friends/useGetFriends';
import BackToHome from '../global/BackToHome';
import Spinner from '../global/Spinner';

function FriendsList() {
  const [searchParams] = useSearchParams();
  const { friendsData, isLoadingFriendsData, errorFriendsData } =
    useGetFriends();
  const numberResults = friendsData?.data?.friends?.length || 1;
  const page = Number(searchParams.get('page')) || 1;
  const limit = 20;
  const dataStart = (page - 1) * limit;
  const dataEnd = page * limit;
  const dataFilter =
    friendsData?.data?.friends?.slice(dataStart, dataEnd) || [];

  console.log(friendsData?.data);
  return (
    <div className="w-full h-[90vh] flex flex-col gap-3 p-3">
      <span className="text-center text-green-800 capitalize text-3xl font-semibold ">
        Friends List
      </span>
      {isLoadingFriendsData && (
        <div className="capitalize w-full p-2 flexCenter text-md">
          <Spinner />
        </div>
      )}
      {friendsData && dataFilter && numberResults && dataFilter.length > 0 && (
        <>
          {' '}
          <div className="w-full p-2 h-full overflow-y-auto overflow-x-hidden flex flex-row items-start justify-start gap-3 flex-wrap">
            {dataFilter.map((friend, i) => {
              return <ProfileUserFriend key={`${i}-12`} user={friend} />;
            })}
          </div>
          <Pagination numberResults={numberResults} limit={limit} />{' '}
        </>
      )}
      {!isLoadingFriendsData && dataFilter.length === 0 && (
        <div className="capitalize w-full p-2 flexCenter text-md">
          No friends
        </div>
      )}
    </div>
  );
}

export default FriendsList;

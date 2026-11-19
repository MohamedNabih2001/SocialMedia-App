import useResponseFriendRequest from '../../Queries/Friends/useResponseFriendRequest';
import useGetFriendsRequests from '../../Queries/FriendsRequests/useGetFriendsRequests';
import Spinner from '../global/Spinner';

function FriendsRequests() {
  const {
    data: friendsRequestsData,
    isLoading: isLoadingFriendsRequestsData,
    error: errorFriendsRequestsData,
  } = useGetFriendsRequests();
  const {
    responseFriendRequest,
    isResponsingFriendRequest,
    errorResponseFriendRequest,
  } = useResponseFriendRequest();
  const isLoading = isLoadingFriendsRequestsData || isResponsingFriendRequest;
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="w-full p-2 flex flex-col justify-center items-center gap-4">
      <h2 className="capitalize font-bold text-3xl">Friends Requests</h2>
      {friendsRequestsData &&
        friendsRequestsData.data.map((data, i) => {
          return (
            <div key={i} className={`w-full p-2  border-b-2 flexStart gap-3 `}>
              <div className="w-full flexStart gap-3  ">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={data?.sender?.image.imageUrl}
                    alt="profile"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-fit flex flex-row gap-2 justify-center items-start">
                  <h2 className="text-sm font-semibold capitalize text-gray-950">
                    {data.sender.firstName} {data.sender.lastName}
                  </h2>
                </div>
              </div>
              <div className="w-fit flexCenter gap-3 ">
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
            </div>
          );
        })}
    </div>
  );
}

export default FriendsRequests;
/*
    return (
     
    );
  
*/

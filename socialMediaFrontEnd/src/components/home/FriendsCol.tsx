import { Users } from 'lucide-react';
import ProfileUser from '../global/ProfileUserFriend';
import { useState } from 'react';
export const friends = [
  {
    _id: '684f1111a222b333c444d555',
    name: 'Ahmed Ali',
    image: 'https://i.pravatar.cc/150?img=1',
  },

  {
    _id: '684f2222a333b444c555d666',
    name: 'Sara Mohamed',
    image: 'https://i.pravatar.cc/150?img=5',
  },

  {
    _id: '684f2222a333b444c555d666',
    name: 'Sara Mohamed',
    image: 'https://i.pravatar.cc/150?img=5',
  },

  {
    _id: '684f2222a333b444c555d633',
    name: 'Sara Mohamed',
    image: 'https://i.pravatar.cc/150?img=5',
  },

  {
    _id: '684f3333a444b555c666d777',
    name: 'Omar Hassan',
    image: 'https://i.pravatar.cc/150?img=8',
  },

  {
    _id: '684f2222a333b444c555d666',
    name: 'Sara Mohamed',
    image: 'https://i.pravatar.cc/150?img=5',
  },

  {
    _id: '684f2222a333b444c555d666',
    name: 'Sara Mohamed',
    image: 'https://i.pravatar.cc/150?img=5',
  },

  {
    _id: '684f2222a333b444c555d633',
    name: 'Sara Mohamed',
    image: 'https://i.pravatar.cc/150?img=5',
  },

  {
    _id: '684f3333a444b555c666d777',
    name: 'Omar Hassan',
    image: 'https://i.pravatar.cc/150?img=8',
  },
  {
    _id: '684f2222a333b444c555d666',
    name: 'Sara Mohamed',
    image: 'https://i.pravatar.cc/150?img=5',
  },

  {
    _id: '684f2222a333b444c555d666',
    name: 'Sara Mohamed',
    image: 'https://i.pravatar.cc/150?img=5',
  },

  {
    _id: '684f2222a333b444c555d633',
    name: 'Sara Mohamed',
    image: 'https://i.pravatar.cc/150?img=5',
  },

  {
    _id: '684f3333a444b555c666d777',
    name: 'Omar Hassan',
    image: 'https://i.pravatar.cc/150?img=8',
  },

  {
    _id: '684f2222a333b444c555d666',
    name: 'Sara Mohamed',
    image: 'https://i.pravatar.cc/150?img=5',
  },

  {
    _id: '684f2222a333b444c555d666',
    name: 'Sara Mohamed',
    image: 'https://i.pravatar.cc/150?img=5',
  },

  {
    _id: '684f2222a333b444c555d633',
    name: 'Sara Mohamed',
    image: 'https://i.pravatar.cc/150?img=5',
  },

  {
    _id: '684f3333a444b555c666d777',
    name: 'Omar Hassan',
    image: 'https://i.pravatar.cc/150?img=8',
  },
];
function FriendsCol() {
  const friendsNumber = friends.length;
  const [friendsToShow, setFriendsShow] = useState(6);
  const friendsDif = friendsNumber - friendsToShow;
  function increaseToShowFriends() {
    if (friendsToShow >= friendsNumber) return;
    if (friendsDif >= 5) {
      setFriendsShow((prev) => prev + 5);
    }
    if (friendsDif < 5) {
      setFriendsShow((prev) => prev + friendsDif);
    }
  }
  return (
    <div className="w-full flex flex-col items-start justify-center gap-6">
      <div className="flexStart capitalize text-2xl gap-2 text-blue-700 font-semibold">
        <span>
          <Users />
        </span>
        <span>Friends</span>
      </div>
      {friends.slice(0, friendsToShow).map((friend, i) => {
        return <ProfileUser key={i} user={friend} />;
      })}
      <span
        onClick={increaseToShowFriends}
        className={`capitalize ${friendsDif === 0 ? 'pointer-events-none' : ''}  cursor-pointer hover:bg-green-500 animation hover:scale-110 p-2 flexCenter text-sm bg-green-200 text-gray-700 rounded-2xl font-bold `}
      >
        {friendsDif === 0 ? 'no more friends' : 'show more friends'}
      </span>
    </div>
  );
}

export default FriendsCol;

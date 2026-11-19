import { Link } from 'react-router-dom';
import type { User } from '../../../types/types';

type FriendPreview = {
  _id: string;
  name: string;
  image: string;
};

interface PropsType {
  user: User | FriendPreview;
}

function ProfileUserFriend({ user }: PropsType) {
  const name =
    'name' in user ? user.name : `${user.firstName} ${user.lastName}`;

  const imageUrl =
    typeof user.image === 'string' ? user.image : user.image.imageUrl;

  return (
    <div className="w-70 flex flex-row items-center justify-start gap-3 bg-gray-100 p-2 rounded-2xl">
      <Link
        to={`/user/${user._id}`}
        className="w-12 h-12 overflow-hidden cursor-pointer hover:scale-[110%] animation rounded-full flexCenter border-gray-700 border"
      >
        <img
          src={imageUrl}
          className="w-full h-full object-cover object-top"
          alt="profile"
        />
      </Link>

      <div className="flex flex-col items-start justify-center gap-1">
        <Link
          to={`/user/${user._id}`}
          className="text-md font-bold text-gray-600 hover:text-gray-950 capitalize cursor-pointer"
        >
          {name}
        </Link>
      </div>
    </div>
  );
}

export default ProfileUserFriend;

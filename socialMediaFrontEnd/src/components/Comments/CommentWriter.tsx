import { Link } from 'react-router-dom';
import type { User } from '../../../types/types';
interface PropsType {
  user: User;
}
function CommentWriter({ user }: PropsType) {
  return (
    <div className="w-full flex flex-row justify-between items-center gap-2">
      <div className="w-full flexStart gap-3 ">
        <Link
          to={`/user/${user._id}`}
          className="w-7 h-7 overflow-hidden cursor-pointer hover:scale-[110%] animation rounded-full flexCenter border-gray-700  border "
        >
          <img
            src={user.image.imageUrl}
            className="w-full h-full object-cover object-top "
            alt="profile"
          />
        </Link>
        <div className="flex flex-col items-start justify-center gap-1">
          <Link
            to={`/user/${user._id}`}
            className="text-sm font-bold text-gray-600 hover:text-gray-950 capitalize cursor-pointer"
          >
            {user.firstName} {user.lastName}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CommentWriter;

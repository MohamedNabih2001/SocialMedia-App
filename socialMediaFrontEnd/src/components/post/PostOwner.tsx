import { Link, useLocation } from 'react-router-dom';
import { TimeDiff } from '../../api/functions';
import type { User } from '../../../types/types';
import { useAppSMSelector } from '../../redux/hooks';
interface PropsType {
  date: string;
  user: User;
  id?: string;
}
function PostOwner({ user, date, id }: PropsType) {
  const userData = useAppSMSelector((state) => state.user);
  const location = useLocation();
  const timeDiffrence = TimeDiff(date);
  const isMe = user && user.email === userData.user?.email;
  return (
    <div className="w-full flex flex-row justify-between items-center gap-2">
      <div className="w-full flexStart gap-3 ">
        <Link
          to={isMe ? '/user/me' : `/user/${user._id}`}
          className="w-10 h-10 overflow-hidden cursor-pointer hover:scale-[110%] animation rounded-full flexCenter border-gray-700  border "
        >
          <img
            src={user.image.imageUrl}
            className="w-full h-full object-cover object-top"
            alt="profile"
          />
        </Link>
        <div className="flex flex-col items-start justify-center gap-1">
          <Link
            to={isMe ? '/user/me' : `/user/${user._id}`}
            className="text-md font-bold text-gray-600 hover:text-gray-950 capitalize cursor-pointer"
          >
            {user.firstName} {user.lastName}
          </Link>
          <span className="text-[13px] font-bold text-gray-600 ">
            {timeDiffrence}
          </span>
        </div>
      </div>

      {isMe && id && location.pathname === '/user/me' && (
        <div className="flexCenter gap-1 self-center ">
          <Link
            to={`/editPost/${id}`}
            className="p-1 w-30 text-sm cursor-pointer animation hover:bg-green-700 hover:text-white gap-1 flexCenter rounded-xl capitalize font-semibold bg-white border text-green-700 border-green-700"
          >
            Edit Post
          </Link>
        </div>
      )}
    </div>
  );
}

export default PostOwner;

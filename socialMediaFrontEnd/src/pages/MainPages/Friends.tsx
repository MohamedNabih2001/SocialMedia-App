import { Link, Outlet, useLocation } from 'react-router-dom';
import BackToHome from '../../components/global/BackToHome';

function Friends() {
  const pathname = useLocation().pathname;
  console.log(pathname);
  return (
    <div className="w-full p-3">
      <div className="flex flex-row justify-between items-center">
        <BackToHome />
        {pathname === '/friends' ? (
          <Link
            className=" border-2 rounded-2xl text-blue-400 capitalize p-1.5 font-semibold hover:text-white hover:bg-blue-400 hover:border-blue-400 "
            to="requests"
          >
            Go to friends request
          </Link>
        ) : (
          <Link
            className=" border-2 rounded-2xl text-blue-400 capitalize p-1.5 font-semibold hover:text-white hover:bg-blue-400 hover:border-blue-400 "
            to="/friends"
          >
            Go to friends list
          </Link>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Friends;

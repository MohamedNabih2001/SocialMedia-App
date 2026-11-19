import { Link } from 'react-router-dom';
import useGetMe from '../../Queries/Auth/useGetMe';

function Profile() {
  const { meData, isLoadingMe, meError } = useGetMe();
  return (
    <Link
      to="/profile"
      className="w-12 h-12 overflow-hidden rounded-full flexCenter border-green-700 hover:scale-105 animation  border "
    >
      <img
        src={meData?.data?.image?.imageUrl}
        className="w-full h-full object-cover object-top"
        alt="profile"
      />
    </Link>
  );
}

export default Profile;

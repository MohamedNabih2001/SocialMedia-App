import Spinner from '../../components/global/Spinner';
import HomePosts from '../../components/home/HomePosts';
import Navbar from '../../components/home/Navbar';
import { useAppSMSelector } from '../../redux/hooks';
import SignInPage from '../AuthPages/SignInPage';

function Home() {
  const userData = useAppSMSelector((state) => state.user);

  if (userData.loading === true || userData.loading === null) {
    return (
      <div className="w-full h-full flexCenter">
        <Spinner sizeSpin={20} />;
      </div>
    );
  }
  if (userData.isAuth) {
    return (
      <div className="w-full h-full flex flex-col gap-4">
        <Navbar />
        <div className="w-full grid gap-2 grid-cols-[0.7fr_1.6fr_0.7fr]">
          <div className="w-full px-1"></div>
          <HomePosts />
          <div className="w-full"></div>
        </div>
      </div>
    );
  }
  if (!userData.isAuth) {
    return (
      <div className="w-full">
        <SignInPage />
      </div>
    );
  }
}

export default Home;

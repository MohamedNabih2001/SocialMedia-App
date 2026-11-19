import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './pages/MainPages/App';
import Home from './pages/MainPages/Home';
import AuthLoader from './pages/ProtectPages/AuthLoader';
import Register from './pages/AuthPages/Register';
import Friends from './pages/MainPages/Friends';
import ProtectPage from './pages/ProtectPages/ProtectPage';
import User from './pages/MainPages/User';
import ProfilePage from './pages/MainPages/ProfilePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from './pages/ProtectPages/NotFoundPage';
import MyProfilePage from './pages/MainPages/MyProfilePage';
import EditPost from './pages/MainPages/EditPost';
import MessagePage from './pages/MainPages/MessagePage';
import FriendsList from './components/friends/FriendsList';
import FriendsRequests from './components/friends/FriendsRequests';

const router = createBrowserRouter([
  {
    path: '',
    errorElement: <NotFoundPage />,
    element: (
      <AuthLoader>
        <App />
      </AuthLoader>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/friends',
        element: (
          <ProtectPage>
            <Friends />
          </ProtectPage>
        ),
        children: [
          {
            index: true,
            element: <FriendsList />,
          },
          {
            path: 'requests',
            element: <FriendsRequests />,
          },
        ],
      },
      {
        path: '/user/me',
        element: (
          <ProtectPage>
            <MyProfilePage />
          </ProtectPage>
        ),
      },
      {
        path: '/user/:id',
        element: (
          <ProtectPage>
            <User />
          </ProtectPage>
        ),
      },
      {
        path: '/editPost/:id',
        element: (
          <ProtectPage>
            <EditPost />
          </ProtectPage>
        ),
      },
      {
        path: '/profile',

        element: (
          <ProtectPage>
            <ProfilePage />
          </ProtectPage>
        ),
      },
      {
        path: '/message',

        element: (
          <ProtectPage>
            <MessagePage />
          </ProtectPage>
        ),
      },
    ],
  },
]);

export function Root() {
  return (
    <>
      <ToastContainer
        position="top-center"
        newestOnTop={true}
        autoClose={1500}
        theme="colored"
      />
      <RouterProvider router={router} />;
    </>
  );
}

import { useEffect } from 'react';
import { socket } from '../redux/userSlice';
import {
  addNewComment,
  addNewCommentReact,
  addNewNotification,
  addNewPostReact,
  deleteCommentReact,
  deletePostReact,
} from './socketFunctions';

function useSocket() {
  useEffect(() => {
    socket?.on('connect', () => console.log('Connected', socket.id));
    socket?.on('disconnect', (reason) => console.log('Disconnected:', reason));
    socket?.on('newNotification', addNewNotification);
    socket?.on('newReactPost', addNewPostReact);
    socket?.on('newReactComment', addNewCommentReact);
    socket?.on('newComment', addNewComment);
    socket?.on('deleteReactPost', deletePostReact);
    socket?.on('deleteReactComment', deleteCommentReact);

    return () => {
      socket?.off('connect', () => console.log('Connected', socket.id));
      socket?.off('disconnect', (reason) =>
        console.log('Disconnected:', reason)
      );
      socket?.off('newNotification', addNewNotification);
      socket?.off('newReactPost', addNewPostReact);
      socket?.off('deleteReactPost', deletePostReact);
      socket?.off('deleteReactComment', deleteCommentReact);
      socket?.off('newReactComment', addNewCommentReact);
      socket?.off('newComment', addNewComment);
    };
  }, []);
}

export default useSocket;

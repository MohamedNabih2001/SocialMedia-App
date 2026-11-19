import { queryClient } from '../main';

export function addNewNotification(payload: any) {
  queryClient.setQueryData(['Notifications'], (oldData: any) => {
    console.log(oldData);
    const isExist = oldData?.data.findIndex(
      (noti: any) => noti?._id?.toString() === payload?.data?._id.toString()
    );

    if (isExist === -1) {
      return { ...oldData, data: [...oldData.data, payload.data] };
    } else {
      return oldData;
    }
  });
}

/////////////////////////////
export function addNewComment(payload: any) {
  const id = payload.post.toString();
  queryClient.setQueryData([`postCommentsNumber-${id}`, id], (oldData: any) => {
    const oldNumber = oldData?.number;
    const newNumber = oldNumber + 1;
    return { number: newNumber, ...oldData };
  });
}

/////////////////////////////
export function addNewPostReact(payload: any) {
  const postId = payload.post.toString();
  queryClient.setQueryData(
    [`postReactsCount-${postId}`, postId],
    (oldData: any) => {
      console.log(oldData);
      const oldNumber = oldData?.number;
      const newNumber = oldNumber + 1;
      return { number: newNumber, ...oldData };
    }
  );

  queryClient.invalidateQueries({
    queryKey: [`postReactsUser-${postId}`, postId],
  });
}

/////////////////////////////
export function addNewCommentReact(payload: any) {
  const commentId = payload.comment.toString();
  queryClient.setQueryData(
    [`commentReactsCount-${commentId}`, commentId],
    (oldData: any) => {
      console.log(oldData);
      const oldNumber = oldData?.number;
      const newNumber = oldNumber + 1;
      return { number: newNumber, ...oldData };
    }
  );

  queryClient.invalidateQueries({
    queryKey: [`commentReactsUser-${commentId}`, commentId],
  });
}

/////////////////////////////
export function deletePostReact(payload: any) {
  const postId = payload.post;
  queryClient.invalidateQueries({
    queryKey: [`postReactsUser-${postId}`, postId],
  });
  queryClient.invalidateQueries({
    queryKey: [`postReactsCount-${postId}`, postId],
  });
}

/////////////////////////////
export function deleteCommentReact(payload: any) {
  console.log('deleteCommentReact', payload);
}

/////////////////////////////

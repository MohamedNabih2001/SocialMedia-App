import { MessageCircle, ThumbsUp } from 'lucide-react';
import { useRef, useState } from 'react';
import { useAppSMDispatch } from '../../redux/hooks';
import { openModalFunction } from '../../redux/modalSlice';
import useAddReactPost from '../../Queries/PostReacts/useAddReactPost';
import useRemoveReactPost from '../../Queries/PostReacts/useRemoveReactPost';
import useUpdateReactPost from '../../Queries/PostReacts/useUpdateReactPost';
import useGetReactPostCount from '../../Queries/PostReacts/useGetReactPostCount';
import useGetIsUserReactPost from '../../Queries/PostReacts/useGetIsUserReactPost';
export const emojies: { id: string; img: string }[] = [
  { id: 'like', img: '/emoji/like.jpg' },
  { id: 'love', img: '/emoji/love.jpg' },
  { id: 'haha', img: '/emoji/haha.jpg' },
  { id: 'angry', img: '/emoji/angry.jpg' },
  { id: 'wow', img: '/emoji/wow.jpg' },
  { id: 'sad', img: '/emoji/sad.jpg' },
] as const;
interface PropsType {
  id: string;
  commentsNum?: number;
}
function ReactButtons({ id, commentsNum }: PropsType) {
  const [showOtherReacts, setShowOtherReacts] = useState(false);
  const timeOut = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { postReactsCount, isLoadingPostReactsCount, errorPostReactsCount } =
    useGetReactPostCount({ id });
  const {
    isUserReactPostData,
    isLoadingIsUserReactPostData,
    errorIsUserReactPostData,
  } = useGetIsUserReactPost({ id });
  const { addPostReact, isAddingPostReacts, errorAddPostReact } =
    useAddReactPost();
  const { deletePostReact, isDeletingPostReacts, errorDeletePostReact } =
    useRemoveReactPost();
  const { updatePostReact, isUpdatingPostReacts, errorUpdatePostReact } =
    useUpdateReactPost();

  const dispatch = useAppSMDispatch();
  function openModal(data: any) {
    dispatch(openModalFunction(data));
  }
  const isLoading =
    isLoadingIsUserReactPostData ||
    isLoadingPostReactsCount ||
    isUpdatingPostReacts ||
    isDeletingPostReacts ||
    isAddingPostReacts;
  return (
    <div className="w-full flexStart gap-6 p-2">
      <div className={`${isLoading ? 'pointer-events-none' : ''} relative`}>
        <span
          className="  p-1 flexCenter gap-2 hover:bg-gray-300 rounded-xl "
          onMouseEnter={async () => {
            if (timeOut.current) {
              clearTimeout(timeOut.current);
            }
            setShowOtherReacts(true);
          }}
          onMouseLeave={async () => {
            timeOut.current = setTimeout(() => {
              setShowOtherReacts(false);
            }, 700);
          }}
        >
          {isUserReactPostData && !isUserReactPostData.userReact ? (
            <ThumbsUp
              className="w-6 h-6 rounded-full hover:scale-110 animation cursor-pointer"
              onClick={() => addPostReact({ post: id, type: 'like' })}
            />
          ) : (
            isUserReactPostData &&
            isUserReactPostData.userReact && (
              <span
                onClick={() => {
                  deletePostReact({
                    reactId: isUserReactPostData.userReact._id,
                    postId: id,
                  });
                  setShowOtherReacts(false);
                }}
                className="relative z-100 overflow-hidden w-8 h-8 rounded-full animation hover:scale-120 cursor-pointer"
              >
                <img
                  src={
                    emojies.find(
                      (emj) => emj.id === isUserReactPostData?.userReact?.type
                    )?.img
                  }
                  className="w-full h-full object-contain scale-110"
                  alt={'reactPost'}
                />
              </span>
            )
          )}{' '}
          <span className="text-sm font-bold">
            {postReactsCount?.number === 0 ? '' : postReactsCount?.number}
          </span>
        </span>
        {showOtherReacts && (
          <div
            onMouseEnter={async () => {
              if (timeOut.current) {
                clearTimeout(timeOut.current);
              }
              setShowOtherReacts(true);
            }}
            onMouseLeave={async () => {
              timeOut.current = setTimeout(() => {
                setShowOtherReacts(false);
              }, 700);
            }}
            className="absolute rounded-4xl top-[-150%] left-[10%] p-2 bg-gray-700 text-gray-50 flexCenter gap-3"
          >
            {emojies.map((emoji, i) => {
              return (
                <span
                  key={`${emoji.id}3${i}`}
                  onClick={() => {
                    const isUserCurrentReact =
                      isUserReactPostData?.userReact?.type === emoji.id;
                    if (isUserCurrentReact) {
                      setShowOtherReacts(false);
                      return;
                    }
                    if (isUserReactPostData && isUserReactPostData.userReact) {
                      updatePostReact({
                        id: isUserReactPostData.userReact._id,
                        type: emoji.id,
                      });

                      setShowOtherReacts(false);
                    } else {
                      addPostReact({ post: id, type: emoji.id });
                      setShowOtherReacts(false);
                    }
                  }}
                  className="relative z-100 overflow-hidden w-8 h-8 rounded-full animation hover:scale-120 cursor-pointer"
                >
                  <img
                    src={emoji.img}
                    className="w-full h-full object-contain scale-110"
                    alt={emoji.id}
                  />
                </span>
              );
            })}
          </div>
        )}
      </div>
      <div
        onClick={() => openModal({ type: 'Post', id: id, position: 'down' })}
        className="flexCenter gap-2 cursor-pointer hover:bg-gray-300 rounded-xl p-1"
      >
        <MessageCircle />{' '}
        <span className="text-sm font-bold">
          {commentsNum ? commentsNum : ''}
        </span>
      </div>
    </div>
  );
}

export default ReactButtons;

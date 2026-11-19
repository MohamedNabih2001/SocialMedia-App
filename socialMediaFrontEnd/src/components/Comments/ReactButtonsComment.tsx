import { MessageSquareReply, ThumbsUp } from 'lucide-react';
import { useRef, useState } from 'react';
import { useAppSMDispatch } from '../../redux/hooks';
import { openModalFunction } from '../../redux/modalSlice';
import { emojies } from '../post/ReactButtons';
import useAddReactComment from '../../Queries/CommentReacts/useAddReactComment';
import useRemoveReactComment from '../../Queries/CommentReacts/useRemoveReactComment';
import useUpdateReactComment from '../../Queries/CommentReacts/useUpdateReactComment';
import useGetIsUserReactComment from '../../Queries/CommentReacts/useGetIsUserReactComment';
import useGetReactCommentCount from '../../Queries/CommentReacts/useGetReactCommentCount';
interface PropsType {
  id: string;
  postId: string;
  replyShow: () => void;
}
function ReactButtonsComment({ id, postId, replyShow }: PropsType) {
  const [showOtherReacts, setShowOtherReacts] = useState(false);
  const timeOut = useRef<ReturnType<typeof setTimeout> | null>(null);
  const {
    isUserReactCommentData,
    isLoadingIsUserReactCommentData,
    errorIsUserReactCommentData,
  } = useGetIsUserReactComment({ id });
  const {
    commentReactsCount,
    isLoadingCommentReactsCount,
    errorCommentReactsCount,
  } = useGetReactCommentCount({ id });
  const { addReactComment, isAddingCommentReacts, errorAddReactComment } =
    useAddReactComment();
  const {
    deleteCommentReact,
    isDeletingCommentReacts,
    errorDeleteCommentReact,
  } = useRemoveReactComment();
  const {
    updateCommentReact,
    isUpdatingCommentReacts,
    errorUpdateCommentReact,
  } = useUpdateReactComment();

  const reactsNumber = commentReactsCount?.number;

  const userReact = isUserReactCommentData?.userReact;
  const isLoading =
    isAddingCommentReacts ||
    isDeletingCommentReacts ||
    isLoadingCommentReactsCount ||
    isUpdatingCommentReacts ||
    isLoadingIsUserReactCommentData;
  return (
    <div className="w-full flexStart gap-6 p-1">
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
          {!userReact ? (
            <ThumbsUp
              className="w-5 h-5 rounded-full hover:scale-110 animation cursor-pointer"
              onClick={() =>
                addReactComment({ comment: id, type: 'like', post: postId })
              }
            />
          ) : (
            <span
              onClick={() => {
                deleteCommentReact({ reactId: userReact._id, commentId: id });
                setShowOtherReacts(false);
              }}
              className="relative z-100 overflow-hidden w-7 h-7 rounded-full animation hover:scale-120 cursor-pointer"
            >
              <img
                src={emojies.find((emj) => emj.id === userReact.type)?.img}
                className="w-full h-full object-contain scale-110"
                alt={'commentReact'}
              />
            </span>
          )}{' '}
          <span className="text-sm font-bold">
            {reactsNumber ? reactsNumber : ''}
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
            className="absolute rounded-4xl top-[-150%] left-[10%] p-1 bg-gray-700 text-gray-50 flexCenter gap-3"
          >
            {emojies.map((emoji, i) => {
              return (
                <span
                  key={`${emoji.id}3${i}`}
                  onClick={() => {
                    if (userReact) {
                      updateCommentReact({ id: userReact._id, type: emoji.id });
                      setShowOtherReacts(false);
                    } else {
                      addReactComment({
                        comment: id,
                        post: postId,
                        type: emoji.id,
                      });
                      setShowOtherReacts(false);
                    }
                  }}
                  className="relative z-100 overflow-hidden w-7 h-7 rounded-full animation hover:scale-120 cursor-pointer"
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
        onClick={() => replyShow()}
        className="flexCenter gap-2 cursor-pointer hover:bg-gray-300 rounded-xl p-1"
      >
        <MessageSquareReply size={19} />
      </div>
    </div>
  );
}

export default ReactButtonsComment;

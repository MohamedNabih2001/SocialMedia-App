import { useEffect, useRef, useState } from 'react';
import PostOwner from './PostOwner';
import ReactButtons from './ReactButtons';
import { useAppSMSelector } from '../../redux/hooks';
import Comments from '../Comments/Comments';
import useGetPost from '../../Queries/Posts/useGetPost';
import Spinner from '../global/Spinner';
import useGetReactPost from '../../Queries/PostReacts/useGetReactPost';
interface PropsType {
  id: string;
}
//    { id: 'like', img: '/emoji/like.jpg', count: 0 },
// { id: 'love', img: '/emoji/love.jpg', count: 0 },
// { id: 'haha', img: '/emoji/haha.jpg', count: 0 },
// { id: 'angry', img: '/emoji/angry.jpg', count: 0 },
// { id: 'wow', img: '/emoji/wow.jpg', count: 0 },
// { id: 'sad', img: '/emoji/sad.jpg', count: 0 },
export const emojies: { id: string; img: string }[] = [] as const;
function PostModal({ id }: PropsType) {
  const [isCommentsLoading, setCommentsLoading] = useState<boolean | null>(
    null
  );
  const { postData, isLoadingPost, errorPostData } = useGetPost(id);
  const { postReactsData, isLoadingPostReacts, errorPostReacts } =
    useGetReactPost({ id });
  const isLoading = isLoadingPost || isLoadingPostReacts;
  let postReactsInfo: any[] = [];
  const postReactStats = postReactsData?.data.forEach((react) => {
    const reactExist = postReactsInfo.find(
      (reactInfo) => reactInfo.id === react.type
    );
    if (reactExist) {
      const currentReactsInfo = postReactsInfo.filter(
        (react) => react.id !== reactExist.id
      );
      postReactsInfo = [
        ...currentReactsInfo,
        { ...reactExist, count: reactExist.count + 1 },
      ];
    } else {
      postReactsInfo.push({
        id: react.type,
        img: `/emoji/${react.type}.jpg`,
        count: 1,
      });
    }
  });
  const modal = useAppSMSelector((state) => state.modal);

  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(
    function () {
      if (!modalRef.current) {
        console.log(':none');
        return;
      }
      if (
        modal.position === 'down' &&
        !isLoading &&
        postData &&
        postReactsData &&
        isCommentsLoading === false
      ) {
        console.log('down');
        modalRef.current.scrollTo({
          top: modalRef.current.scrollHeight,
          behavior: 'smooth',
        });
      } else if (modal.position === 'top') {
        console.log('top');
        modalRef.current.scrollTop = 0;
      }
    },
    [modal.position, isLoading, postData, postReactsData, isCommentsLoading]
  );
  if (isLoadingPost) {
    return (
      <div className="w-full p-2 ">
        <Spinner />
      </div>
    );
  }

  if (!postData || postData.data === null)
    return (
      <div className="w-200 h-full text-black bg-gray-300 flexCenter font-semibold capitalize gap-4 rounded-2xl p-4 overflow-y-auto ">
        No post is Removed
      </div>
    );
  if (postData && postData.data && !isLoading) {
    return (
      <div
        ref={modalRef}
        className="w-200 h-full text-black bg-gray-300 flex flex-col gap-4 rounded-2xl p-4 overflow-y-auto "
      >
        <PostOwner
          user={postData?.data?.user}
          date={postData?.data?.updatedAt}
        />
        <div className="w-full flexStart text-[15px]">
          {postData?.data.caption}
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2   ">
          {postData?.data?.images?.map((img, i) => {
            const style = `w-full `;
            return (
              <div key={i} className={style}>
                <img
                  className="w-full h-full object-contain"
                  src={img.imageUrl}
                  alt={`image${i}`}
                />
              </div>
            );
          })}
        </div>
        {id && modal.isOpen === true && modal.id === id && (
          <ReactButtons id={id} />
        )}
        {id &&
          modal.isOpen === true &&
          modal.id === id &&
          postReactsData &&
          postReactsInfo.length > 0 && (
            <div className="border border-gray-400 p-2 rounded-2xl flexStart gap-3">
              {postReactsInfo.map((react, i) => {
                return (
                  <div key={i} className="flexStart gap-2 font-semibold">
                    <div className='"w-7 h-7 rounded-full"'>
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={react.img}
                        alt={react.id}
                      />
                    </div>{' '}
                    {react.count}
                  </div>
                );
              })}
            </div>
          )}
        {id && modal.isOpen === true && modal.id === id && (
          <Comments setCommentsLoading={setCommentsLoading} postId={id} />
        )}
      </div>
    );
  }
}

export default PostModal;

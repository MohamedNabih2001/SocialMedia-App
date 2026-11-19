import type { DataGetPostType, DataPostType } from '../../../types/types';
import useGetCommentsPost from '../../Queries/Comments/useGetCommentsPost';
import useGetCommentsPostNumber from '../../Queries/Comments/useGetCommentsPostNumber';
import { useAppSMDispatch } from '../../redux/hooks';
import { openModalFunction } from '../../redux/modalSlice';
import PostOwner from './PostOwner';
import ReactButtons from './ReactButtons';
type PostType = {
  _id: string;
  caption: string;
  user: { _id: string; name: string; image: string };
  createdAt: string;
  updatedAt: string;
  images: [] | { imageUrl: string; publicId: string }[];
};
interface PropsType {
  post: DataGetPostType;
}
interface OpenModalPropsType {
  id: string;
  position?: 'top' | 'down';
}
function Post({ post }: PropsType) {
  const dispatch = useAppSMDispatch();
  function openModal({ id, position = 'top' }: OpenModalPropsType) {
    dispatch(openModalFunction({ id, position, type: 'Post' }));
  }
  const {
    postCommentsNumber,
    isLoadingPostCommentsNumber,
    errorPostCommentsNumber,
  } = useGetCommentsPostNumber({ id: post._id });

  const imagesNumber = post.images.length;
  const imageCode =
    imagesNumber === 0 ? 'noImage' : imagesNumber > 1 ? 'images' : 'oneImage';
  return (
    <div className="w-full bg-gray-100 flex flex-col gap-4 rounded-2xl p-2 text-gray-950">
      <PostOwner user={post.user} date={post.updatedAt} id={post._id} />
      <div className="w-full flexStart text-[15px]">{post.caption}</div>
      {imageCode !== 'noImage' && (
        <div
          className="w-full h-100 cursor-pointer hover:opacity-70"
          onClick={() => openModal({ id: String(post._id), position: 'top' })}
        >
          {imageCode === 'oneImage' && (
            <div className="w-full flexCenter h-100 ">
              <img
                className="w-full h-full object-contain"
                src={post.images[0].imageUrl}
              />
            </div>
          )}
          {imageCode === 'images' && imagesNumber === 3 && (
            <div className="w-full grid grid-rows-2 grid-cols-4 gap-2 h-100 ">
              {post.images.map((img, i) => {
                const style = `w-full ${i === 0 ? 'col-span-2 row-span-2' : 'col-span-2 '} h-full object-cover`;
                return <img key={i} className={style} src={img.imageUrl} />;
              })}
            </div>
          )}
          {imageCode === 'images' && imagesNumber === 2 && (
            <div className="w-full grid grid-rows-2 grid-cols-4 gap-2 h-100 ">
              {post.images.map((img, i) => {
                const style = `w-full col-span-2 row-span-2 h-full object-cover`;
                return <img key={i} className={style} src={img.imageUrl} />;
              })}
            </div>
          )}
          {imageCode === 'images' && imagesNumber > 3 && (
            <div className="w-full grid grid-rows-2 grid-cols-4 gap-2 h-100 ">
              {post.images.slice(0, 3).map((img, i) => {
                const restImages = imagesNumber - 3;
                const style = `w-full ${i === 0 ? 'col-span-2 row-span-2' : 'col-span-2 '} relative  h-full `;
                return (
                  <div key={i} className={style}>
                    {i == 2 && (
                      <span className=" text-4xl font-bold  absolute w-full h-full z-50 inset-0 bg-white/40 flex flex-row justify-center items-center ">
                        + {restImages}
                      </span>
                    )}
                    <img
                      className="w-full h-full object-cover"
                      src={img.imageUrl}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      {post && postCommentsNumber && post._id && (
        <ReactButtons id={post._id} commentsNum={postCommentsNumber.number} />
      )}
    </div>
  );
}

export default Post;

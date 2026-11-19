import Post from './Post';
import type { ResponseGetPosts } from '../../../types/types';

function Posts({ postsData }: { postsData: ResponseGetPosts }) {
  if (!postsData) {
    return (
      <div className="w-full p-1 ">
        <div className="w-full flex flex-col gap-4 capitalize text-lg font-semibold ">
          No Posts to show
        </div>
      </div>
    );
  }
  if (postsData) {
    return (
      <div className="w-full p-1 ">
        <div className="w-full flex flex-col gap-4  ">
          {postsData?.data.map((post, i) => {
            return <Post key={i} post={post} />;
          })}
        </div>
      </div>
    );
  }
}

export default Posts;

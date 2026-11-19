import { useEffect } from 'react';
import Spinner from '../global/Spinner';
import Posts from '../post/Posts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostsApi } from '../../api/postFunctions';
import { useInView } from 'react-intersection-observer';
function HomePosts() {
  const { ref, inView } = useInView();
  const params = { limit: 10 };
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ['posts'],
      queryFn: ({ pageParam }) =>
        getPostsApi({ pageParam, paramsFilter: params }),
      initialPageParam: 1,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        const totalPages = lastPage.totalPages;
        const currentPage = lastPage.currentPage;
        if (currentPage < totalPages) {
          return lastPage.currentPage + 1;
        } else {
          return null;
        }
      },
    });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="w-full ">
      {isFetching && (
        <div className="w-full flexCenter p-2">
          <Spinner />
        </div>
      )}
      {data &&
        data.pages &&
        data.pages.map((page, i) => <Posts key={i} postsData={page} />)}
      {!isFetching && hasNextPage && (
        <div
          ref={ref}
          className="w-full h-1 capitalize text-lg flexCenter"
        ></div>
      )}
    </div>
  );
}

export default HomePosts;

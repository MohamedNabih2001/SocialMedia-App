import BackToHome from '../../components/global/BackToHome';
import useGetMe from '../../Queries/Auth/useGetMe';
import Posts from '../../components/post/Posts';
import useGetPostsByUser from '../../Queries/Posts/useGetPostsByUser';
import Spinner from '../../components/global/Spinner';
import { getUserPostsApi } from '../../api/postFunctions';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

function MyProfilePage() {
  const { meData, isLoadingMe, meError } = useGetMe();
  const id = meData?.data?._id;
  const { ref, inView } = useInView();
  const params = { limit: 10 };
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ['myPosts', id],
      enabled: !!id,
      refetchOnWindowFocus: false,
      queryFn: ({ pageParam }) =>
        getUserPostsApi({ userId: id, pageParam, params }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (!lastPage) return null;
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
    <div className="w-full p-2 flex flex-col items-center justify-center gap-3">
      <div className="w-full p-2 flex flex-col items-center justify-center gap-3">
        <div className=" w-full capitalize text-3xl font-semibold text-center">
          My Profile page
        </div>
        <div className="  w-full capitalize text-start">
          <BackToHome />
        </div>
      </div>
      <div className="w-full grid grid-cols-[3fr_5fr]">
        <div className="w-full flex flex-col justify-center items-center gap-4 self-start">
          <div className=" w-fit h-90 flexCenter overflow-hidden rounded-2xl shadow-xl">
            <img
              className="w-full h-full object-contain object-top "
              src={meData?.data?.image?.imageUrl}
              alt=" fullProfile photo"
            />
          </div>
          <div className="w-full text-md flexCenter font-semibold capitalize">
            Name : {meData?.data?.firstName} {meData?.data?.lastName}
          </div>
          <div className="w-full text-md flexCenter font-semibold capitalize">
            role : {meData?.data?.role}
          </div>
          <div className="w-full text-md flexCenter font-semibold capitalize">
            age : {meData?.data?.age}
          </div>
        </div>

        {
          <div className="w-full  self-start">
            {isFetching && (
              <div className="w-full flexCenter p-2">
                <Spinner />
              </div>
            )}
            {data &&
              data.pages &&
              data.pages.map((page, i) => {
                if (page) {
                  return <Posts key={i} postsData={page} />;
                } else return null;
              })}
            {!isFetching && hasNextPage && (
              <div
                ref={ref}
                className="w-full h-1 capitalize text-lg flexCenter"
              ></div>
            )}{' '}
          </div>
        }
      </div>
    </div>
  );
}

export default MyProfilePage;

import { useLocation, useParams } from 'react-router-dom';
import useGetPost from '../../Queries/Posts/useGetPost';
import Spinner from '../../components/global/Spinner';
import { useEffect, useRef, useState } from 'react';
import { Image, RemoveFormattingIcon, RotateCcw, Trash, X } from 'lucide-react';
import Line from '../../components/global/Line';
import { toast } from 'react-toastify';
import useUpdatePost from '../../Queries/Posts/useUpdatePost';
import BackToHome from '../../components/global/BackToHome';
import useDeletePost from '../../Queries/Posts/useDeletePost';
interface DeletedImageType {
  imageUrl: string;
  publicId: string;
}
function EditPost() {
  const [deletedImages, setDeletedImages] = useState<DeletedImageType[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newCaption, setNewCaption] = useState<string | undefined>();
  const params = useParams();
  const captionRef = useRef<HTMLTextAreaElement | null>(null);
  const id = params.id;
  const { postData, isLoadingPost, errorPostData } = useGetPost(id);
  const { updatePost, isUpdatingPost, errorUpdating } = useUpdatePost();
  const { deletePost, isDeletingPost, errorDeletePost } = useDeletePost();
  useEffect(
    function () {
      if (captionRef.current && newCaption) {
        captionRef.current.value = newCaption;
      }
      if (captionRef.current && postData?.data && !newCaption) {
        captionRef.current.value = postData?.data.caption;
      }
    },

    [newCaption, postData?.data]
  );
  function saveChanges() {
    const formData = new FormData();
    if (newCaption) {
      formData.append('caption', newCaption);
    }
    if (deletedImages.length > 0) {
      formData.append('deletedImages', JSON.stringify(deletedImages));
    }
    if (newImages.length > 0) {
      newImages.forEach((image) => {
        formData.append('images', image);
      });
    }

    if (
      !formData.has('caption') &&
      !formData.has('images') &&
      !formData.has('deletedImages')
    ) {
      return toast.error('No data to change');
    }
    if (formData && id) {
      updatePost({ data: formData, id: id });
      setNewCaption(undefined);
      setDeletedImages([]);
      setNewImages([]);
    }
  }
  if (isLoadingPost) {
    return (
      <div className=" w-full">
        <Spinner />
      </div>
    );
  }
  if (postData && id) {
    return (
      <div className="w-full pt-2 pb-4 px-4 flex flex-col items-center justify-center gap-4">
        <h1 className="capitalize text-3xl font-bold">Post Editing</h1>
        <div className="w-full flex flex-row items-center justify-between p-2">
          <BackToHome />
          <button
            onClick={() => deletePost({ id: id })}
            className="w-fit p-2 text-sm capitalize cursor-pointer font-semibold flexStart gap-2 text-start animation hover:bg-red-600 hover:text-white rounded-xl bg-white border text-red-600 border-red-600"
          >
            <X size={15} /> Remove Post
          </button>
        </div>

        <div className="w-full flexStart gap-3">
          <label className="capitalize font-semibold text-md" htmlFor="post">
            Caption of post :
          </label>
          <textarea
            ref={captionRef}
            rows={6}
            id="post"
            className="border-b-2 p-1 border-gray-400 w-[70%] focus:border-gray-800 focus:outline-0"
            defaultValue={postData.data?.caption}
            onBlur={(e) => {
              console.log(e.target.value);
              if (
                e.target.value === '' ||
                e.target.value === postData.data?.caption
              ) {
                setNewCaption(undefined);
              } else {
                setNewCaption(e.target.value);
              }
            }}
          />
          <span className="text-gray-400">must be exist</span>
        </div>

        <div className="w-full flexStart gap-4">
          <label className="capitalize font-semibold text-md" htmlFor="image">
            Add new Images :
          </label>
          <input
            type="file"
            multiple
            id="image"
            onChange={(e) => {
              if (e.target.files) {
                const files = e.target.files;
                for (const file of files) {
                  setNewImages((prev) => [...prev, file]);
                }
                return null;
              }
            }}
            placeholder="Change profile image "
            className="w-full hidden peer pl-6 py-2 border-b-2 border-gray-400 placeholder:text-gray-400 focus:border-gray-800 focus:outline-0 focus:placeholder:text-transparent"
          />
          <span className=" text-gray-400 border-2 p-2  ">
            {newImages.length > 0 ? 'Images uploaded' : 'No files'}
          </span>
          <label
            htmlFor="image"
            className=" hover:text-blue-800 cursor-pointer text-blue-400 flexCenter gap-2   "
          >
            <Image />
          </label>
          {newImages.length !== 0 && (
            <span
              onClick={() => setNewImages([])}
              className=" hover:text-gray-800 cursor-pointer text-gray-400 justify-self-end"
            >
              <X size={20} />
            </span>
          )}
        </div>
        <Line />
        <div className="w-full flex flex-col justify-center items-center gap-4 ">
          <h2 className="capitalize text-xl font-bold">Existing Images</h2>
          <div className="w-full flexStart gap-3 flex-wrap">
            {postData.data.images.map((image, i) => {
              if (deletedImages?.includes(image)) {
                return null;
              }
              return (
                <div
                  key={i}
                  className="w-60 h-60 p-1 group relative bg-gray-100 rounded-2xl overflow-hidden"
                >
                  <span
                    onClick={() => {
                      setDeletedImages((prev) => [...prev, image]);
                    }}
                    className="hidden group-hover:block absolute top-[3%] right-[5%] hover:text-red-600 cursor-pointer"
                  >
                    <Trash />
                  </span>
                  <img
                    className="w-full h-full object-contain"
                    src={image.imageUrl}
                    about={`image ${i}`}
                  />
                </div>
              );
            })}
            {deletedImages.length === postData?.data?.images?.length && (
              <div className="w-full flexCenter capitalize text-md p-2">
                You going now to delete all images or there is no images in post
              </div>
            )}
          </div>
        </div>
        <Line />
        <div className="w-full flex flex-col justify-center items-center gap-4 ">
          <h2 className="capitalize text-xl font-bold">Deleting Images</h2>
          <div className="w-full flexStart gap-3 flex-wrap">
            {deletedImages.length > 0 ? (
              deletedImages.map((image, i) => {
                return (
                  <div
                    key={i}
                    className="w-60 h-60 p-1 group relative bg-gray-100 rounded-2xl overflow-hidden"
                  >
                    <span
                      onClick={() => {
                        setDeletedImages((prev) =>
                          prev.filter((im) => im.imageUrl !== image.imageUrl)
                        );
                      }}
                      className="hidden group-hover:block absolute top-[3%] right-[5%] hover:text-green-600 cursor-pointer"
                    >
                      <RotateCcw />
                    </span>
                    <img
                      className="w-full h-full object-contain"
                      src={image.imageUrl}
                      about={`image ${i}`}
                    />
                  </div>
                );
              })
            ) : (
              <div className="w-full flexCenter capitalize text-md p-2">
                No Deleted images{' '}
              </div>
            )}
          </div>
        </div>
        <Line />
        <div className="w-full flex flex-col justify-center items-center gap-4 ">
          <h2 className="capitalize text-xl font-bold">News Images</h2>
          <div className="w-full flexStart gap-3 flex-wrap">
            {newImages.length > 0 ? (
              newImages.map((imageFile, i) => {
                const imageUrl = URL.createObjectURL(imageFile);
                return (
                  <div
                    key={i}
                    className="w-60 h-60 p-1 group relative bg-gray-100 rounded-2xl overflow-hidden"
                  >
                    <span
                      onClick={() => {
                        setNewImages((prev) =>
                          prev.filter((im) => im !== imageFile)
                        );
                      }}
                      className="hidden group-hover:block absolute top-[3%] right-[5%] hover:text-red-600 cursor-pointer"
                    >
                      <Trash />
                    </span>
                    <img
                      className="w-full h-full object-contain"
                      src={imageUrl}
                      about={`image ${i}`}
                    />
                  </div>
                );
              })
            ) : (
              <div className="w-full flexCenter capitalize text-md p-2">
                No New added images
              </div>
            )}
          </div>
        </div>
        <Line />
        <div className="w-full flexCenter p-2">
          <button
            disabled={isUpdatingPost}
            onClick={() => saveChanges()}
            className="p-2 disableBtn hover:scale-110 cursor-pointer capitalize font-semibold animation text-green-600 border-2 border-green-600 hover:border-white hover:text-white hover:bg-green-600 rounded-2xl "
          >
            {isUpdatingPost ? 'Saving . . . . .' : 'save change'}
          </button>
        </div>
      </div>
    );
  }
}

export default EditPost;

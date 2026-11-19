import { ImageUp, User } from 'lucide-react';
import Input from '../form/Input';
import { useForm } from 'react-hook-form';
import TextArea from '../form/TextArea';
import UseAddPost from '../../Queries/Posts/UseAddPost';
const postData = [
  {
    type: 'textArea',
    id: 'caption',
    icon: <User size={20} />,
  },
  {
    type: 'file',
    id: 'images',
    placeholder: 'Post Images',
    icon: <ImageUp size={20} />,
  },
] as const;
export type FormDataPostType = {
  caption: string;
  images: FileList;
};
function AddingPost() {
  const { addPost, isAddingPost, errorAddPost } = UseAddPost();
  const { handleSubmit, register, resetField, watch } =
    useForm<FormDataPostType>();
  const filesNumber = watch('images')?.length;
  const resetFile = () => resetField('images');
  const resetText = () => resetField('caption');
  function onSubmit(data: FormDataPostType) {
    const formData = new FormData();
    if (data.caption) {
      formData.append('caption', String(data.caption));
      resetText();
    }
    if (data.images) {
      for (const image of data.images) {
        formData.append('images', image as File);
      }

      resetFile();
    }
    addPost(formData);
  }

  return (
    <div className="w-full p-2 h-full flexCenter text-black  ">
      <div className=" w-60 md:w-100 flex flex-col gap-2 border border-gray-300 rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md ">
        <p className="bg-red-500 p-3 text-gray-50 text-2xl uppercase text-center w-full">
          New Post
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-2 w-full flex flex-col justify-center items-center gap-5 pt-9"
        >
          <TextArea
            key={postData[0].id}
            id={postData[0].id}
            rowsNumber={3}
            {...register(postData[0].id, {
              required: 'Caption must be included ',
            })}
          />
          <Input
            key={postData[1].id}
            id={postData[1].id}
            type={postData[1].type}
            placeholder={postData[1].placeholder}
            icon={postData[1].icon}
            resetFile={resetFile}
            filesNumber={filesNumber}
            {...register(postData[1].id)}
          />

          <button
            disabled={isAddingPost}
            className="p-2 font-semibold disableBtn bg-red-700 text-gray-50 rounded-sm cursor-pointer hover:scale-102 animation text-[15px]"
          >
            {' '}
            {isAddingPost ? 'Addin post . . .' : 'Add Post'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddingPost;

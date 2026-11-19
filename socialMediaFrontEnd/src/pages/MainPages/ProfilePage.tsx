import { ArrowRight, Image, Moon, Sun, X } from 'lucide-react';
import type React from 'react';
import { useState, type ChangeEvent } from 'react';
import BackToHome from '../../components/global/BackToHome';
import useGetMe from '../../Queries/Auth/useGetMe';
import type { User } from '../../../types/types';
import { formatDateTime } from '../../api/functions';
import useUpdateMe from '../../Queries/Auth/useUpdateMe';
import useLogOut from '../../Queries/Auth/useLogOut';
import Spinner from '../../components/global/Spinner';
import { Link } from 'react-router-dom';
import { useAppSMDispatch } from '../../redux/hooks';
import { changeThemeApp } from '../../redux/userSlice';

function ProfilePage() {
  const dispatch = useAppSMDispatch();
  function dataToArrayEditable(data: User | undefined) {
    if (!data) return;
    const arrayData = Object.entries(data);
    const notUsed = [
      '__v',
      'createdAt',
      'updatedAt',
      'role',
      '_id',
      'email',
      'image',
      'theme',
    ];
    const used: any = [];
    arrayData.forEach(([key, value]) => {
      if (notUsed.includes(key)) {
        return;
      } else {
        used.push({ value: value, id: key });
      }
    });
    return used;
  }
  function dataToArrayUneditable(data: User | undefined) {
    if (!data) return;
    const arrayData = Object.entries(data);
    const notUsed = [
      '__v',
      'firstName',
      'lastName',
      'age',
      'role',
      '_id',
      'image',
      'theme',
    ];
    const used: any = [];
    arrayData.forEach(([key, value]) => {
      if (notUsed.includes(key)) {
        return;
      } else {
        used.push({ value: value, id: key });
      }
    });
    return used;
  }
  const { meData, isLoadingMe, meError } = useGetMe();
  const { updateMe, isUpdatingMe, updateMeError } = useUpdateMe();
  const { logoutFromApp, isLogingOut, logoutError } = useLogOut();
  const [file, setFile] = useState<File | null>(null);

  function updateInfo(e: ChangeEvent<HTMLInputElement>, id: string) {
    const formData = new FormData();
    formData.append(id, String(e.target.value));
    updateMe(formData);
  }
  const editableDataUsed = dataToArrayEditable(meData?.data);
  const unedditableDataUsed = dataToArrayUneditable(meData?.data);
  function resetFile() {
    setFile(null);
  }
  let url = meData?.data?.image?.imageUrl;
  if (file) {
    url = URL.createObjectURL(file);
  }
  function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files) {
      setFile(e.target.files?.[0]);
    }
  }
  function updateImage() {
    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    }
    updateMe(formData);
    setFile(null);
  }
  function logOut() {
    console.log('log out');
    logoutFromApp();
  }
  function changeTheme() {
    const formData = new FormData();

    if (meData?.data.theme === 'dark') {
      formData.append('theme', 'light');
      updateMe(formData);
      dispatch(changeThemeApp('light'));
    }
    if (meData?.data.theme === 'light') {
      formData.append('theme', 'dark');
      updateMe(formData);
      dispatch(changeThemeApp('dark'));
    }
  }
  return (
    <div className="w-full flex flex-col gap-6 items-center justify-center p-1 ">
      <span className="w-full text-3xl capitalize flexCenter font-bold  ">
        Profile User Information
      </span>
      <div className="w-full text-3xl capitalize flex flex-row justify-between items-center font-bold  ">
        <span className="w-full text-3xl capitalize flexStart font-bold  ">
          <BackToHome />
        </span>

        <span className="w-full text-3xl capitalize flexEnd font-bold  ">
          <Link
            to="/user/me"
            className="w-fit p-2 text-sm capitalize cursor-pointer font-semibold flexStart gap-2 text-start animation hover:bg-blue-600 hover:text-white rounded-xl bg-white border text-blue-600 border-blue-600"
          >
            Go To My page profile <ArrowRight size={15} />
          </Link>
        </span>
      </div>

      <div className="w-full h-[90%] grid gap-3 grid-cols-[1fr_2fr]">
        <div className="w-full h-[60%] border p-1 flex flex-col gap-2 items-center justify-center  rounded-4xl">
          <span className="w-full text-xl capitalize flexCenter font-bold  ">
            Profile User Image
          </span>
          {isUpdatingMe ? (
            <Spinner />
          ) : (
            <img
              src={url ? url : '/hero.png'}
              className="w-full h-[80%] object-contain"
              alt="profile"
            />
          )}
        </div>
        <div className="w-full h-fit border p-4 rounded-4xl flex flex-col items-center justify-center gap-3">
          <span className="w-full text-xl capitalize flexCenter font-bold  ">
            Profile User Details
          </span>
          <div className="w-full flexStart p-1 gap-3">
            <span>Change Mode :</span>{' '}
            <button
              disabled={isUpdatingMe}
              onClick={() => changeTheme()}
              className="hover:scale-110 hover:text-blue-500 animation cursor-pointer border-2 p-1 rounded-xl"
            >
              {meData?.data.theme === 'dark' ? (
                <Moon size={19} />
              ) : (
                <Sun size={19} />
              )}
            </button>
          </div>

          {editableDataUsed?.map((data: any, i: number) => {
            return (
              <div key={i} className="w-full flexStart p-1">
                <label
                  className="capitalize text-sm font-semibold"
                  htmlFor={data.id}
                >
                  {data.id} :
                </label>
                <input
                  id={data.id}
                  type="text"
                  onBlur={(e) => updateInfo(e, data.id)}
                  defaultValue={data.value}
                  className="w-[60%] p-2 border-b-2 focus:border-blue-700 focus:outline-0"
                />
              </div>
            );
          })}
          {unedditableDataUsed?.map((data: any, i: number) => {
            const isDate = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
            const date = isDate.test(data.value);
            if (date) {
              data.value = formatDateTime(data.value);
            }
            return (
              <div key={i} className="w-full flexStart p-1 text-gray-500">
                <div className="capitalize text-sm font-semibold">
                  {data.id} :
                </div>
                <div className="w-[60%] p-2 border-b-2 ">{data.value}</div>
              </div>
            );
          })}

          <div className="w-full flexStart gap-4">
            <input
              type="file"
              id="image"
              onChange={(e) => {
                uploadFile(e);
              }}
              placeholder="Change profile image "
              className="w-full hidden peer pl-6 py-2 border-b-2 border-gray-400 placeholder:text-gray-400 focus:border-gray-800 focus:outline-0 focus:placeholder:text-transparent"
            />
            <span className=" text-gray-400 border-2 p-2  ">
              {file ? 'Image uploaded' : 'No files'}
            </span>
            <label
              htmlFor="image"
              className=" hover:text-blue-800 cursor-pointer text-blue-400 flexCenter gap-2   "
            >
              <Image />
            </label>
            {file !== null && (
              <span
                onClick={() => resetFile()}
                className=" hover:text-gray-800 cursor-pointer text-gray-400 justify-self-end"
              >
                <X size={20} />
              </span>
            )}
            {file !== null && (
              <span
                onClick={() => updateImage()}
                className=" hover:text-green-800 font-semibold cursor-pointer text-gray-400 justify-self-end border-2 rounded-xl p-1"
              >
                Change to this image
              </span>
            )}
          </div>
          <div className="w-full flexCenter gap-4 p-2 ">
            <button
              onClick={() => logOut()}
              className="p-2 border-2 rounded-2xl font-semibold cursor-pointer text-red-400 hover:text-red-700 border-red-400 hover:border-red-700 capitalize text-md"
            >
              log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

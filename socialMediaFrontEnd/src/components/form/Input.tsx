import { Eye, EyeOff, X } from 'lucide-react';
import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type ForwardedRef,
  type ReactNode,
  useEffect,
} from 'react';
type PropsType = InputHTMLAttributes<HTMLInputElement> & {
  type?: string;
  id: string;
  filesNumber?: number;
  resetFile?: () => void;
  placeholder: string;
  icon: ReactNode;
};
const Input = forwardRef(
  (
    {
      id,
      filesNumber,
      resetFile,
      type = 'text',
      placeholder,
      icon,
      ...props
    }: PropsType,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [passwordShow, setPasswordShow] = useState(false);
    const files = filesNumber ?? 0;
    if (type === 'password') {
      return (
        <div className="w-full relative">
          <input
            {...props}
            type={passwordShow ? 'text' : 'password'}
            ref={ref}
            placeholder={placeholder}
            className="w-full peer pl-6 py-2 border-b-2 border-gray-400 placeholder:text-gray-400 focus:border-gray-800 focus:outline-0 focus:placeholder:text-transparent"
          />
          <span className=" absolute top-[25%] left-[0%] peer-focus:text-gray-800 text-gray-400   ">
            {icon}
          </span>
          <span
            onClick={() => {
              setPasswordShow((prev) => !prev);
            }}
            className=" absolute top-[25%] right-[0%] cursor-pointer hover:text-gray-800 text-gray-400   "
          >
            {passwordShow ? <EyeOff size={24} /> : <Eye size={24} />}
          </span>
        </div>
      );
    } else if (type === 'file') {
      return (
        <div className="w-full flex flex-row justify-start items-center gap-4">
          <input
            {...props}
            type={type}
            id={id}
            multiple
            // onChange={(e) => {
            //   const Files = e.target.files ? e.target.files : null;
            //   setFiles(Files);
            // }}
            ref={ref}
            placeholder={placeholder}
            className="w-full hidden peer pl-6 py-2 border-b-2 border-gray-400 placeholder:text-gray-400 focus:border-gray-800 focus:outline-0 focus:placeholder:text-transparent"
          />
          <span className=" text-gray-400 border-2 p-2  ">
            {files === 0 ? 'No files' : 'Files to upload : ' + files}
          </span>
          <label
            htmlFor={id}
            className=" hover:text-gray-800 cursor-pointer text-gray-400 flexCenter gap-2   "
          >
            {placeholder} {icon}
          </label>
          {files > 0 && resetFile && (
            <span
              onClick={() => resetFile()}
              className=" hover:text-gray-800 cursor-pointer text-gray-400 justify-self-end"
            >
              <X size={20} />
            </span>
          )}
        </div>
      );
    } else {
      return (
        <div className="w-full relative">
          <input
            type={type}
            ref={ref}
            placeholder={placeholder}
            className="w-full peer pl-6 py-2 border-b-2 border-gray-400 placeholder:text-gray-400 focus:border-gray-800 focus:outline-0 focus:placeholder:text-transparent"
            {...props}
          />
          <span className=" absolute top-[25%] left-[0%] peer-focus:text-gray-800 text-gray-400   ">
            {icon}
          </span>
        </div>
      );
    }
  }
);

export default Input;

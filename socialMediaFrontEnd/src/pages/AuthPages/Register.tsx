
import { ImageUp, Key, Mail, User } from 'lucide-react';
import Input from '../../components/form/Input';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useRegister from '../../Queries/Auth/useRegister';
import Spinner from '../../components/global/Spinner';

const signInData = [
  {
    type: 'text',
    id: 'firstName',
    placeholder: 'First Name',
    icon: <User size={20} />,
  },
  {
    type: 'text',
    id: 'lastName',
    placeholder: 'Last Name',
    icon: <User size={20} />,
  },
  {
    type: 'password',
    id: 'password',
    placeholder: 'Password',
    icon: <Key size={20} />,
  },
  {
    type: 'password',
    id: 'passwordConfirm',
    placeholder: 'Password Confirm',
    icon: <Key size={20} />,
  },
  {
    type: 'email',
    id: 'email',
    placeholder: 'E-mail',
    icon: <Mail size={20} />,
  },
  {
    type: 'number',
    id: 'age',
    placeholder: 'Age',
    icon: <User size={20} />,
  },
  {
    type: 'file',
    id: 'image',
    placeholder: 'Profile Image',
    icon: <ImageUp size={20} />,
  },
] as const;

export type FormDataRegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  age: number;
  image?: FileList;
};

export type FormDataEditedRegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  age: number;
  image?: File;
};

function Register() {
  function isEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  ////////////////////////////////
  function isPassword(password: string, passwordConfirm: string): boolean {
    const isPqsswordValid =
      password.length > 6 && password === passwordConfirm;
    return isPqsswordValid;
  }

  ////////////////////////////////
  const { signUp, isRegistering, registerError } = useRegister();
  ////////////////////////////////
  const { handleSubmit, formState, register, resetField, watch } =
    useForm<FormDataRegisterType>();
  ////////////////////////////////
  const filesNumber = watch('image')?.length;
  ////////////////////////////////
  const resetFile = () => resetField('image');
  ////////////////////////////////
  function onSubmit(data: FormDataRegisterType) {
    const isEmailValid = isEmail(data.email);
    const isPassowrdCorrect = isPassword(
      data.password,
      data.passwordConfirm,
    );

    if (!isEmailValid || !isPassowrdCorrect) {
      console.log('Please Provide valid data email and password');
      return 'Not valid';
    }

    const dataEdited: FormDataEditedRegisterType = {
      ...data,
      image: data.image?.[0],
    };

    const array = Object.entries(dataEdited);
    const formData: FormData = new FormData();

    array.forEach(([key, value]) => {
      if (key === 'image' && !value) {
        return;
      }

      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    signUp(formData);
  }

  if (isRegistering) {
    return (
      <div className="w-full p-2 flexCenter">
        <Spinner />
      </div>
    );
  }

  ////////////////////////////////
  return (
    <div className="w-full p-2 min-h-screen flexCenter  ">
      <div className=" w-60 md:w-100 flex flex-col gap-2 border border-gray-300 rounded-2xl overflow-hidden bg-white/30 backdrop-blur-md ">
        <p className="bg-blue-500 p-3 text-gray-50 text-2xl uppercase text-center w-full">
          Register
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-2 w-full flex flex-col justify-center items-center gap-5 pt-9"
        >
          {signInData.map((data, i) => {
            if (data.type === 'file') {
              return (
                <Input
                  key={i}
                  id={data.id}
                  type={data.type}
                  placeholder={data.placeholder}
                  icon={data.icon}
                  resetFile={resetFile}
                  filesNumber={filesNumber}
                  {...register(data.id)}
                />
              );
            } else {
              return (
                <Input
                  key={i}
                  id={data.id}
                  type={data.type}
                  placeholder={data.placeholder}
                  icon={data.icon}
                  {...register(data.id, {
                    required: `${data.placeholder} is required`,
                  })}
                />
              );
            }
          })}
          <button
            disabled={isRegistering}
            className="p-2 disableBtn bg-blue-700 text-gray-50 rounded-sm cursor-pointer hover:scale-102 animation text-[15px]"
          >
            Register
          </button>
        </form>
        <div className="p-2 w-full flexCenter gap-2 text-md text-gray-950">
          <span>If you have account </span>
          <Link className="text-green-700 hover:text-green-800" to="/">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

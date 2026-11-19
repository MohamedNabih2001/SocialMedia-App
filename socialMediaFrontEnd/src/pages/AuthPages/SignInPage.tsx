import { Key, Mail, User } from 'lucide-react';
import Input from '../../components/form/Input';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useSignIn from '../../Queries/Auth/useSignIn';
const signInData = [
  {
    type: 'email',
    id: 'email',
    placeholder: 'E-mail',
    icon: <Mail size={20} />,
  },
  {
    type: 'password',
    id: 'password',
    placeholder: 'Password',
    icon: <Key size={20} />,
  },
] as const;
export type FormDataSignInType = {
  email: string;
  password: string;
};
function SignInPage() {
  const { handleSubmit, formState, register } = useForm<FormDataSignInType>();
  const { signInFromApp, isSigningIn, signInError } = useSignIn();
  function onSubmit(data: FormDataSignInType) {
    signInFromApp(data);
  }

  return (
    <div className="w-full p-2 min-h-screen flexCenter  ">
      <div className=" w-60 md:w-90 flex flex-col gap-2 border border-gray-300 rounded-2xl overflow-hidden bg-white/30 backdrop-blur-md ">
        <p className="bg-green-500 p-3 text-gray-50 text-2xl uppercase text-center w-full">
          Sign In
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-2 w-full flex flex-col justify-center items-center gap-5 pt-9"
        >
          {signInData.map((data, i) => {
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
          })}
          <button
            disabled={isSigningIn}
            className="p-2 disableBtn bg-green-700 text-gray-50 rounded-sm cursor-pointer hover:scale-102 animation text-[15px]"
          >
            Sign in
          </button>
        </form>
        <div className="p-2 w-full flexStart gap-2 text-md text-gray-950">
          <span>If you don`t have account please </span>
          <Link className="text-blue-500 hover:text-blue-700" to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;

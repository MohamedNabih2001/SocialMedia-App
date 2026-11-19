import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function BackToHome() {
  return (
    <Link
      to="/"
      className="w-fit p-2 text-sm capitalize cursor-pointer font-semibold flexStart gap-2 text-start animation hover:bg-green-600 hover:text-white rounded-xl bg-white border text-green-600 border-green-600"
    >
      <ArrowLeft size={15} /> Back To Home
    </Link>
  );
}

export default BackToHome;

import BackToHome from '../../components/global/BackToHome';

function NotFoundPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 p-3">
      <p className="text-2xl capitalize">ops,sorry!!!!!!!!!!</p>
      <p className="text-2xl capitalize">This page not found</p>
      <BackToHome />
    </div>
  );
}

export default NotFoundPage;

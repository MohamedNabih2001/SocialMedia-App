import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
interface PropsType {
  numberResults: number;
  limit: number;
}
function Pagination({ numberResults, limit }: PropsType) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get('page')) || 1;

  const totalPages = Math.ceil(numberResults / limit);
  function changePageNumber(type: string) {
    if (type === 'inc' && pageNumber < totalPages) {
      console.log('increase');
      const params = new URLSearchParams(searchParams);
      params.set('page', `${pageNumber + 1}`);
      setSearchParams(params);
    }
    if (type === 'dec' && pageNumber <= totalPages && pageNumber > 1) {
      console.log('decrease');
      const params = new URLSearchParams(searchParams);
      params.set('page', `${pageNumber - 1}`);
      setSearchParams(params);
    }
  }

  return (
    <div className="w-full text-black flex flex-row justify-between items-center px-2 py-1">
      <div className="flexStart gap-2 ">
        <span className="font-semibold ">{numberResults} result</span>
        <span className="font-semibold capitalize">by</span>
        <span className="font-semibold ">{totalPages} pages</span>
      </div>
      <div className="flexStart gap-2 ">
        <button
          onClick={() => changePageNumber('dec')}
          disabled={pageNumber === 1}
          className="p-1  disabled:pointer-events-none disabled:border-gray-400 disabled:text-gray-400 cursor-pointer animation hover:bg-blue-400 hover:text-white gap-1 flexCenter rounded-xl capitalize font-semibold bg-white border text-blue-400 border-blue-400"
        >
          <ArrowLeft size={17} />
          <span className="flexCenter">Previous</span>
        </button>
        <span className="text-blue-400">{pageNumber}</span>
        <button
          onClick={() => changePageNumber('inc')}
          disabled={pageNumber === totalPages}
          className="p-1 disabled:pointer-events-none disabled:border-gray-400 disabled:text-gray-400 cursor-pointer animation hover:bg-blue-400 hover:text-white flexCenter gap-1 rounded-xl capitalize font-semibold bg-white border text-blue-400 border-blue-400"
        >
          <span className="flexCenter">Next</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;

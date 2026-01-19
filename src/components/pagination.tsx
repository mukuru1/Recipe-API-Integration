interface Props {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination: React.FC<Props> = ({
  page,
  totalPages,
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-10">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="px-4 py-2 bg-white border rounded-md text-slate-700 disabled:opacity-50"
      >
        Prev
      </button>

      <span className="text-slate-700 font-medium">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="px-4 py-2 bg-white border rounded-md text-slate-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

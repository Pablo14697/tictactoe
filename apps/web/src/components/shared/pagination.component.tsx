interface PaginationProps {
  page: number;
  onChangePage: (page: number) => void;
  total: number;
}

export const Pagination = ({ page, onChangePage, total }: PaginationProps) => (
  <div className="inline-flex text-sm">
    <button
      type="button"
      className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-gray-300 border-e-0 bg-white px-3"
      disabled={page < 2}
      onClick={() => onChangePage(page - 1)}
      aria-label={'previous page button'}
    >
      Previous
    </button>
    <span className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3">
      {page}
    </span>

    <button
      type="button"
      className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3"
      disabled={page + 1 > total}
      onClick={() => onChangePage(page + 1)}
      aria-label={'next page button'}
    >
      Next
    </button>
  </div>
);

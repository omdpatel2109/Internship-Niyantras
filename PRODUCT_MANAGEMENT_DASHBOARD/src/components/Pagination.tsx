interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="mt-6 flex items-center justify-center gap-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg bg-blue-600 px-4 py-2 text-xl text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
                &lt;
            </button>

            <span className="font-medium text-gray-700 dark:text-white">
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg bg-blue-600 px-4 py-2 text-xl text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
                &gt;
            </button>
        </div>
  );
}
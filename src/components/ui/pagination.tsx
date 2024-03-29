import React, { useEffect, useState } from "react";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    handlePage: (page: number) => void;
    totalData: number;
}
const Pagination: React.FC<PaginationProps> = ({
    totalPages,
    currentPage,
    handlePage,
    totalData,
}) => {
    const pagDisplay = (totalPages: number, currentPage: number) => {
        if (totalPages <= 3) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            let startPage = currentPage - 2;
            let endPage = currentPage + 2;

            if (startPage < 1) {
                startPage = 1;
                endPage = 3;
            } else if (endPage > totalPages) {
                endPage = totalPages;
                startPage = totalPages - 2;
            }

            return Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => i + startPage
            );
        }
    };
    const pages = pagDisplay(totalPages, currentPage);
    return (
        <>
            <div className="mt-5">
                <div className="flex items-center justify-between border-t border-gray-200 bg-white rounded-lg px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Previous
                        </button>
                        <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing
                                <span className="mx-1 font-medium">
                                    {(currentPage - 1) * 6 + 1 > totalData
                                        ? totalData
                                        : (currentPage - 1) * 6 + 1}
                                </span>
                                to
                                <span className="mx-1 font-medium">
                                    {totalData - currentPage * 6 < 0
                                        ? totalData
                                        : currentPage * 6}
                                </span>
                                of
                                <span className="mx-1 font-medium">
                                    {totalData}
                                </span>
                                results
                            </p>
                        </div>
                        <div>
                            <nav
                                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                                aria-label="Pagination"
                            >
                                <button
                                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    onClick={() => handlePage(currentPage - 2)}
                                    disabled={currentPage === 1}
                                >
                                    <span className="sr-only">Previous</span>
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                {pages.map((page) => (
                                    <button
                                        key={page}
                                        className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 ${
                                            currentPage === page
                                                ? "bg-[#07393C] text-white"
                                                : "bg-white"
                                        }`}
                                        onClick={() => handlePage(page - 1)}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    onClick={() => handlePage(currentPage)}
                                    disabled={currentPage === totalPages}
                                >
                                    <span className="sr-only">Next</span>
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Pagination;

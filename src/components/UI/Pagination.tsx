import React from "react";
import Button from "../atoms/Button/Button";
import { t } from "i18next";

const Pagination = ({ page, setPage, currentPage, totalPages }) => {
  return (
    <div className="flex items-center justify-center">
      <nav className="inline-flex items-center justify-center p-1 rounded bg-white">
        <Button
          className="p-1.5 rounded border text-black bg-white hover:text-white hover:bg-mainColor hover:border-mainColor disabled:text-black disabled:bg-[#eaeaea] disabled:border-[#eaeaea]"
          action={() => setPage((prev: any) => prev - 1)}
          disabled={page === 1}
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </Button>
        <p className="text-gray-500 text-[15px] px-2">
          {t("Page")} {currentPage} {t("of")} {totalPages}
        </p>
        <Button
          className="p-1.5 rounded border text-black bg-white hover:text-white hover:bg-mainColor hover:border-mainColor disabled:text-black disabled:bg-[#eaeaea] disabled:border-[#eaeaea]"
          action={() => setPage((prev: any) => prev + 1)}
          disabled={page === totalPages}
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </Button>
      </nav>
    </div>
  );
};

export default Pagination;

import next from "next/types";
import React, { useState } from "react";

interface ListControlProps {
  handleFilterData: (e: any) => void;
  nextDisabled: boolean;
  page: number;
  onPageChange: (page: number) => void;
  filterString?: string;
  onFilterStringChange?: (filterString: string) => void;
}

export default function ListControl({
  handleFilterData,
  nextDisabled,
  page,
  onPageChange,
  filterString,
  onFilterStringChange,
}: ListControlProps) {
  const handleNextPage = () => {
    onPageChange(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  return (
    <div
      role="ListControl"
      className="flex justify-between w-full max-w-full p-8"
    >
      <button
        className="border rounded-lg shadow-md p-2 hover:cursor-pointer hover:text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
        disabled={page === 1}
        onClick={handlePreviousPage}
      >
        Previous Page
      </button>
      <div className="flex flex-col">
        <input
          type="text"
          className="border rounded-lg shadow-md p-2"
          placeholder="Type to search..."
          onChange={(e) => {
            handleFilterData(e);
            onFilterStringChange?.(e.target.value);
          }}
          value={filterString}
        />
      </div>
      <button
        className="border rounded-lg shadow-md p-2 cursor-pointer hover:text-gray-600"
        disabled={nextDisabled}
        onClick={handleNextPage}
      >
        Next Page
      </button>
    </div>
  );
}

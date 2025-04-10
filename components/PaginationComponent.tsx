'use client'
import usePaginationStore from "@/hooks/usePaginationStore";
import { Pagination } from "@heroui/react";
import clsx from "clsx";
import React, { useState } from "react";

const PaginationComponent = () => {
  
  const totalCount = 20
  const setPage = usePaginationStore(state => state.setPage)
  const setPageSize = usePaginationStore(state => state.setPageSize)

  const setPagination = usePaginationStore(state => state.setPagination)
  const pagination = usePaginationStore(state => state.pagination)

  const {pageNumber, pageSize, totalPages} = pagination

  const start = (pageNumber -1 ) * pageSize + 1
  const end = Math.min(pageNumber * pageSize, totalCount)

  const resultText  =  `Showing ${start}-${end} of ${totalCount} results`
  return (
    <div className="border-t-2 w-full mt-5">
      <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center py-5">
        <div>{resultText}</div>
        <Pagination
          total={20}
          color="secondary"
          page={pageNumber}
          variant="bordered"
          onChange={setPage}
        />
        <div className="flex flex-row gap-1 items-center">
          Page size:
          {[3, 6, 12].map((size) => (
            <div
              className={clsx("page-size-box", {
                "bg-secondary text-white hover:bg-secondary hover:text-white":
                  pageSize === size,
              })}
              key={size}
              onClick={() => setPageSize(size)}
            >
              {size}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;

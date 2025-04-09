'use client'
import { Pagination } from "@heroui/react";
import clsx from "clsx";
import React, { useState } from "react";

const PaginationComponent = () => {
  const [active, setActive] = useState(false);
  return (
    <div className="border-t-2 w-full mt-5">
      <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center py-5">
        <div>showing 1-10 of 23 result</div>
        <Pagination
          total={20}
          color="secondary"
          initialPage={1}
          variant="bordered"
        />
        <div className="flex flex-row gap-1 items-center">
          Page size:
          {[3, 6, 12].map((size) => (
            <div
              className={clsx("page-size-box", {
                "bg-secondary text-white hover:bg-secondary hover:text-white":
                  active,
              })}
              key={size}
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

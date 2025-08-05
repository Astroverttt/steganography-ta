"use client";

import clsx from "clsx";
import { filters } from "@/models/filters";

const FilterBar = () => {
  return (
    <nav className="px-4 pt-12 lg:px-8 xl:pt-20">
      <ul className="flex gap-3 xl:gap-5 w-full whitespace-nowrap overflow-x-auto overflow-hidden hide-scrollbar">
        {filters.map((filter) => {
          const isGrayBg =
            filter.name === "All Categories" ||
            filter.name === "Sub Categories";
          return (
            <li key={filter.id}>
              <button
                type="button"
                className={clsx(
                  `px-4 py-2.5 rounded-xl text-xs xl:text-sm cursor-pointer transition`,
                  isGrayBg
                    ? `bg-gray-200 hover:bg-gray-300 active:bg-gray-400`
                    : `bg-white border border-gray-400 hover:bg-gray-100 active:bg-gray-200`
                )}
              >
                {filter.name}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default FilterBar;

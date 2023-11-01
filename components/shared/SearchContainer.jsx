"use client";

import Search from "./Search";
import Filters from "./Filters";
import { useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import Sort from "./Sort";
import ActiveFilters from "./ActiveFilters";

// This component is used to wrap the search bar and filters
export default function SearchContainer({
  searchParams,
  value,
  isSearchPage,
  placeholder,
  isPersonalPage,
}) {
  // state to control whether the filters are open or not
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <>
      <div
        className={`${
          !isSearchPage && "flex justify-between gap-[10px] flex-wrap items-end"
        }`}
      >
        <Search
          value={value}
          isSearchPage={true}
          searchParams={searchParams}
          handleFilter={() => setIsFiltersOpen(!isFiltersOpen)}
          placeholder={placeholder}
        />
        <AnimatePresence>
          {isFiltersOpen && (
            <>
              <Filters
                isSearchPage={isSearchPage}
                searchParams={searchParams}
                setFiltersActive={setIsFiltersOpen}
              />
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                onClick={() => setIsFiltersOpen(false)}
                className="bg-black/10 fixed inset-0 md:left-[100px]"
              />
            </>
          )}
        </AnimatePresence>
        <Sort
          searchParams={searchParams}
          isSearchPage={isSearchPage}
          isPersonalPage={isPersonalPage}
        />
      </div>
      <ActiveFilters searchParams={searchParams} />
    </>
  );
}

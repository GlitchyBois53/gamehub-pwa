"use client";

import Search from "./Search";
import Filters from "./Filters";
import { useState } from "react";

export default function SearchContainer({ searchParams, value }) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  return (
    <>
      <Search
        value={value}
        isSearchPage={true}
        searchParams={searchParams}
        handleFilter={() => setIsFiltersOpen(!isFiltersOpen)}
      />
      {isFiltersOpen && <Filters searchParams={searchParams} />}
    </>
  );
}

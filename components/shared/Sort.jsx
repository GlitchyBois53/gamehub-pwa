// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

import ActiveFilters from "./ActiveFilters";
import DropDown from "./DropDown";
import { useCallback } from "react";

export default function Sort({ searchParams, isSearchPage, isPersonalPage }) {
  // function for creating the query string
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  // array of options for the dropdowns
  const orderOptions = [
    {
      name: "Ascending",
      value: "asc",
    },
    {
      name: "Descending",
      value: "desc",
    },
  ];

  // array of options for the dropdowns on the personal page
  const sortPersonalOptions = [
    {
      name: "Total Rating",
      value: "total_rating",
    },
    {
      name: "Name",
      value: "name",
    },
    {
      name: "Release Date",
      value: "first_release_date",
    },
  ];

  // array of options for the dropdowns on the search page
  const sortSearchOptions = [
    {
      name: "Total Rating",
      value: "total_rating",
    },
    {
      name: "Critic Rating",
      value: "aggregated_rating",
    },
    {
      name: "User Rating",
      value: "rating",
    },
    {
      name: "Name",
      value: "name",
    },
    {
      name: "Release Date",
      value: "first_release_date",
    },
  ];

  // checking if there is text in the search bar
  const textCheck = searchParams.search;

  return (
    <article className="mt-[12px] flex justify-between flex-col-reverse md:flex-row items-start md:items-center gap-[12px] relative z-30">
      {isSearchPage && (
        <div>
          {textCheck ? (
            <h2 className="text-[12px] font-semibold tracking-[0.72px] uppercase">
              Showing results for:
              <span className={`${searchParams.search && "italic"}`}>
                "{searchParams.search}"
              </span>
            </h2>
          ) : (
            <ActiveFilters searchParams={searchParams} />
          )}
        </div>
      )}
      <div className="flex gap-[18px]">
        <DropDown
          name={"Order"}
          options={orderOptions}
          fn={createQueryString}
          param={"order"}
          searchParams={searchParams.order || "desc"}
        />
        <DropDown
          name={"Sort By"}
          options={isPersonalPage ? sortPersonalOptions : sortSearchOptions}
          fn={createQueryString}
          param={"sort"}
          searchParams={searchParams.sort || "first_release_date"}
        />
      </div>
    </article>
  );
}

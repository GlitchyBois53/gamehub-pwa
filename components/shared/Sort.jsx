import DropDown from "./DropDown";
import { useCallback } from "react";

export default function Sort({ searchParams, isSearchPage, isPersonalPage }) {
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

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

  const textCheck = searchParams.search || searchParams.title;

  return (
    <article className="mt-[12px] flex justify-between flex-col md:flex-row items-start md:items-center gap-[12px] relative z-30">
      {isSearchPage && (
        <div>
          {textCheck && (
            <h2 className="text-[12px] font-semibold tracking-[0.72px] uppercase">
              {searchParams.search ? "Showing results for: " : "Showing "}
              <span className={`${searchParams.search && "italic"}`}>
                {searchParams.search
                  ? `"${searchParams.search}"`
                  : searchParams.title}
              </span>
              {!searchParams.search && searchParams.title && " games"}
            </h2>
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

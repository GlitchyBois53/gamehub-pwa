"use client";

import { useState, useCallback } from "react";
import { useStore } from "../../app/store";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import Toast from "./Toast";

export default function Search({
  isSearchPage,
  searchParams,
  value,
  handleFilter,
  placeholder = "Search for a game...",
}) {
  const [searchValue, setSearchValue] = useState(value || "");
  const pathname = usePathname();
  const theme = useStore((state) => state.theme);
  const router = useRouter();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const includedPaths =
    pathname.includes("/search") ||
    pathname.includes("/library") ||
    pathname.includes("/wishlist");

  function handleSearch(e) {
    e.preventDefault();
    if (searchValue && !isSearchPage) {
      router.push(`/search/?search=${searchValue.toLowerCase()}`);
      return;
    } else if ((searchValue && isSearchPage) || includedPaths) {
      let path =
        pathname + "?" + createQueryString("search", searchValue.toLowerCase());
      if (path.includes("offset")) {
        path = path.replace(/&offset=\d+/g, "");
      }
      router.push(path + "&offset=0");
      return;
    }
    toast.custom((t) => (
      <Toast t={t} message={"Please enter a search term"} type={"error"} />
    ));
  }

  const activeFilter =
    pathname.includes("/search") ||
    pathname.includes("/library") ||
    pathname.includes("/wishlist");

  return (
    <form
      onSubmit={handleSearch}
      className={`flex p-[16px] h-[55px] items-center w-full ${
        theme === "light"
          ? "bg-back-light border-black/20 shadow-black/25"
          : "bg-back-dark border-white/20 shadow-black/50"
      } transition-colors border rounded-[2px] md:max-w-[573px] z-20 relative shadow-search`}
    >
      <img
        src={`${
          theme === "dark" ? "/search-icon-dark.png" : "/search-icon.png"
        }`}
        alt="search-icon"
        className="w-[18px] object-contain"
      />
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="bg-transparent outline-none uppercase text-[14px] px-[16px] tracking-[0.84px] max-w-[573px] w-full"
        placeholder={placeholder}
      />
      {activeFilter && (
        <img
          src={`${
            theme === "dark" ? "/filter-icon-dark.png" : "/filter-icon.png"
          }`}
          alt="filter-icon"
          className="w-[18px] object-contain cursor-pointer"
          onClick={handleFilter}
        />
      )}
    </form>
  );
}

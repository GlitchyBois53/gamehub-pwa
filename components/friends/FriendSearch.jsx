// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

import { usePathname, useRouter } from "next/navigation";
import { useStore } from "../../app/store";
import { useCallback, useState } from "react";

export default function FriendSearch({
  handleSubmit,
  setSearchValue,
  searchValue,
  placeholder,
  isLongBoi,
  searchParams,
  isSearchParams,
  handleChange,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useStore((state) => state.theme);
  // state to control the local search value
  const [localValue, setLocalValue] = useState("");

  // function to create the query string
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  // function to clear the search
  function clearSearch() {
    setLocalValue("");
    router.push("/friends");
  }

  // function to handle the search
  function handleUrl(e) {
    e.preventDefault();
    const path = pathname + "?" + createQueryString("search", localValue);
    router.push(path);
  }
  return (
    <form
      onSubmit={isSearchParams ? handleUrl : handleSubmit}
      className={`flex p-[16px] h-[55px] items-center w-full ${
        theme === "light"
          ? "bg-back-light border-black/20 shadow-black/25"
          : "bg-back-dark border-white/20 shadow-black/50"
      } transition-colors border rounded-[2px] ${
        !isLongBoi && "md:max-w-[573px]"
      } relative shadow-search`}
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
        value={isSearchParams ? localValue : searchValue}
        onChange={
          isSearchParams
            ? (e) => setLocalValue(e.target.value)
            : handleChange
            ? handleChange
            : (e) => setSearchValue(e.target.value)
        }
        className="bg-transparent outline-none uppercase text-[14px] px-[16px] tracking-[0.84px] max-w-[573px] w-full"
        placeholder={placeholder}
      />
      {isSearchParams && localValue.length !== 0 && (
        <img
          src="/close-icon.svg"
          alt="close-icon"
          className="cursor-pointer"
          onClick={clearSearch}
        />
      )}
    </form>
  );
}

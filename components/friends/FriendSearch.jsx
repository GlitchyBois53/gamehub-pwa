import { useStore } from "../../app/store";

export default function FriendSearch({
  handleSubmit,
  setSearchValue,
  searchValue,
  placeholder,
  isLongBoi,
}) {
  const theme = useStore((state) => state.theme);
  return (
    <form
      onSubmit={handleSubmit}
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
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="bg-transparent outline-none uppercase text-[14px] px-[16px] tracking-[0.84px] max-w-[573px] w-full"
        placeholder={placeholder}
      />
    </form>
  );
}

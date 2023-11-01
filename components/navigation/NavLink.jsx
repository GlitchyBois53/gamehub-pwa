"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "../../app/store";

export default function NavLink({
  href,
  activeIcon,
  icon,
  iconDark,
  name,
  hasRequest,
}) {
  // importing the pathname from next/navigation, to chech if the current page is the same as the link
  const pathname = usePathname();

  // importing the theme from the store
  const theme = useStore((store) => store.theme);

  // using pathname to check if the current page is the same as the link, and if it is, using the activeIcon, else using the icon
  const source =
    href !== "/"
      ? pathname.includes(href)
        ? activeIcon
        : pathname.includes("/search") && href === "/games"
        ? activeIcon
        : theme === "light"
        ? icon
        : iconDark
      : pathname === "/"
      ? activeIcon
      : theme === "light"
      ? icon
      : iconDark;

  return (
    <Link className="flex flex-col items-center gap-[3px] relative" href={href}>
      {hasRequest && name === "friends" && (
        <div className="w-[6px] aspect-square rounded-full bg-red-600 absolute top-0 right-[9px]" />
      )}
      <img
        className="w-[20px] aspect-square object-contain"
        src={source}
        alt={`${name}-icon${source === activeIcon ? "-active" : ""}`}
      />
      <p
        className={`${
          source === activeIcon && "bg-game-grad bg-clip-text text-transparent"
        } w-max uppercase text-[10px] font-bold tracking-[0.7px]`}
      >
        {name}
      </p>
    </Link>
  );
}

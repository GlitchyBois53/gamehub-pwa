"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "../../app/store";

export default function NavLink({ href, activeIcon, icon, iconDark, name }) {
  // importing the pathname from next/navigation, to chech if the current page is the same as the link
  const pathname = usePathname();

  // importing the theme from the store
  const theme = useStore((store) => store.theme);

  // setting the source of the image based on the current page and the theme
  // let source;
  // if (href !== '/') {
  //   if (pathname.includes(href)) {
  //     source = activeIcon;
  //   } else if (theme === 'light') {
  //     source = icon;
  //   } else {
  //     source = iconDark;
  //   }
  // } else {
  //   if (pathname === '/') {
  //     source = activeIcon;
  //   } else if (theme === 'light') {
  //     source = icon;
  //   } else {
  //     source = iconDark;
  //   }
  // }

  // Alternative to the above
  //  TODO MORE CONCISE (BUT MAYBE A BIT HARDER TO READ)
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
    <Link className="flex flex-col items-center gap-[3px]" href={href}>
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

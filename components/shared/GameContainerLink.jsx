// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

"use client";

import Link from "next/link";
import { useStore } from "../../app/store";

export default function GameContainerLink({
  href,
  isOnGamePage,
  title,
  isOnProfile,
}) {
  const limit = useStore((state) => state.limit);

  return (
    <Link
      href={`${href}${isOnProfile ? "?" : "&"}limit=${limit}`}
      className={`${
        isOnGamePage
          ? "text-[16px] tracking-[0.96px]"
          : "text-[24px] tracking-[1.44px] bg-clip-text text-transparent bg-game-grad"
      } uppercase font-bold w-max`}
    >
      {title}
    </Link>
  );
}

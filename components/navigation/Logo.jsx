"use client";

import Link from "next/link";
import { useStore } from "../../app/store";

// This component is used to display the logo
export default function Logo() {
  const theme = useStore((store) => store.theme);

  return (
    <>
      <Link href={"/"} className="flex flex-col gap-[7px] items-center">
        <img src="/logo.png" alt="logo" className="w-[40px]" />
        <p className="text-[12px] tracking-[0.8px] font-bold">GAMEHUB</p>
      </Link>
      <hr
        className={`hidden md:block w-full mt-[12px] mb-[24px] border-t-[0.5px] ${
          theme === "light" ? "border-black/20" : "border-white/20"
        }`}
      />
    </>
  );
}

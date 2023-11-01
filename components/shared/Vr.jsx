"use client";

import { useStore } from "../../app/store";

// This component is used to display a vertical line
export default function Vr({ isResponsive }) {
  const theme = useStore((store) => store.theme);
  return (
    <div
      className={`${
        isResponsive ? "h-[1px] xs:w-[1px] xs:h-full w-full" : "w-[1px] h-full"
      } ${theme === "light" ? "bg-black/20" : "bg-white/20"}`}
    />
  );
}

"use client";

import { useStore } from "../../app/store";

export default function Vr() {
  const theme = useStore((store) => store.theme);
  return (
    <div
      className={`h-[1px] xs:w-[1px] xs:h-full w-full ${
        theme === "light" ? "bg-black/20" : "bg-white/20"
      }`}
    />
  );
}

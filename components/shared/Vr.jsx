"use client";

import { useStore } from "../../app/store";

export default function Vr() {
  const theme = useStore((store) => store.theme);
  return (
    <div
      className={`w-[1px] h-full ${
        theme === "light" ? "bg-black/20" : "bg-white/20"
      }`}
    />
  );
}

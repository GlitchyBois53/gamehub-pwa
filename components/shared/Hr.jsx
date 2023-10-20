"use client";

import { useStore } from "../../app/store";

export default function Hr() {
  const theme = useStore((store) => store.theme);
  return (
    <div
      className={`h-[1px] w-full ${
        theme === "light" ? "bg-black/20" : "bg-white/20"
      }`}
    />
  );
}

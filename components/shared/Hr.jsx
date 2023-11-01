"use client";

import { useStore } from "../../app/store";

// This component is used to display the horizontal rule
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

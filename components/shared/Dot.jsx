"use client";

import { useStore } from "../../app/store";

export default function Dot({ isActive }) {
  const theme = useStore((store) => store.theme);
  return (
    <div
      className={`w-[10px] aspect-square rounded-full ${
        isActive
          ? "bg-game-grad"
          : theme === "light"
          ? "border border-black/20"
          : "border border-white/20"
      }`}
    />
  );
}

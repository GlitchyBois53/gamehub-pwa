// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

"use client";

import { useStore } from "../../app/store";

// This component is used to display the dot in the onboarding process
export default function Dot({ isActive }) {
  const theme = useStore((store) => store.theme);
  return (
    <div
      className={`w-[12px] aspect-square rounded-full ${
        isActive
          ? "bg-game-grad"
          : theme === "light"
          ? "border border-black/20"
          : "border border-white/20"
      }`}
    />
  );
}

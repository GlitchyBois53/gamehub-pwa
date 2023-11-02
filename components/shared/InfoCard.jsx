// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

"use client";

import { useStore } from "../../app/store";

// This component is used to display information about the users stats
export default function InfoCard({ icon, darkIcon, number, title }) {
  const theme = useStore((store) => store.theme);
  return (
    <article className="flex items-center flex-col w-full xs:w-[70px] gap-[-4px]">
      <img
        src={theme === "light" ? icon : darkIcon}
        alt={title}
        className="h-[15px] object-contain opacity-60 translate-x-[-0.7px]"
      />
      <h3 className="text-[24px] tracking-[1.4px] font-bold bg-game-grad bg-clip-text text-transparent w-max h-[28px] translate-y-[-4px]">
        {number}
      </h3>
      <h4 className="text-[9px] tracking-[0.56px] font-semibold uppercase">
        {title}
      </h4>
    </article>
  );
}

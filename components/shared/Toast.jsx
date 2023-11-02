// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

"use client";

import { toast } from "sonner";
import { useStore } from "../../app/store";

export default function Toast({ t, type, message }) {
  const theme = useStore((store) => store.theme);

  // setting the icon and close button based on the type of toast
  const icon =
    type === "error"
      ? "/error-icon.svg"
      : type === "success"
      ? "/success-icon.svg"
      : "/info-icon.svg";
  const closeBtn =
    theme === "light" ? "/close-icon.png" : "/close-icon-dark.png";

  const shadow = theme === "light" ? "shadow-black/25" : "shadow-black/50";

  return (
    <div
      className={`p-4 rounded-[7px] sm:min-w-[320px] transition-colors shadow-search gap-[12px] ${shadow} flex items-center w-full bg ${
        theme === "light" ? "border-black/20" : "border-white/20"
      } border-[2px]`}
    >
      <img
        src={icon}
        alt={`${type}-icon`}
        className="w-[16px] object-contain"
      />
      <p className="max-w-[260px] w-full truncate text-[13px] tracking-[0.78px]">
        {message}
      </p>
      <button
        onClick={() => toast.dismiss(t)}
        className="absolute top-[12px] right-[12px]"
      >
        <img className="w-[8px] object-contain" src={closeBtn} />
      </button>
    </div>
  );
}

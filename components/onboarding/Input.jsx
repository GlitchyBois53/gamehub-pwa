"use client";

import { useStore } from "../../app/store";

// This component is used to display the input in the onboarding process
export default function Input({
  name,
  value,
  placeholder,
  handleChange,
  title,
}) {
  const theme = useStore((state) => state.theme);

  return (
    <div className="flex justify-between flex-col">
      <p className="text-[16px] tracking-[0.96px] uppercase font-semibold pb-[10px]">
        {title}
      </p>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-[17px] py-[12px] rounded-[2px] outline-none border uppercase tracking-[0.84px] text-[14px] font-medium ${
          theme === "light"
            ? "border-black/20 bg-back-light"
            : "border-white/20 bg-back-dark"
        }`}
      />
    </div>
  );
}

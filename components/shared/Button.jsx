"use client";

import Link from "next/link";
import { useStore } from "../../app/store";

export default function Button({
  icon,
  lightIcon,
  text,
  handleClick,
  isLink,
  href,
  variant,
  type,
  // setting default values for the attributes
  attributes = "px-[18px] py-[8px] text-[12px] tracking-[0.72px]",
  borderAttributes = "border-[2px]",
  buttonWidth,
}) {
  return (
    <>
      {/* rendering button componenent inside either a Link og a button */}
      {isLink ? (
        <Link href={href} className="block">
          <ButtonBody
            icon={icon}
            text={text}
            variant={variant}
            attributes={attributes}
            borderAttributes={borderAttributes}
            lightIcon={lightIcon}
          />
        </Link>
      ) : (
        <button
          onClick={handleClick}
          className={`block ${buttonWidth || "w-max"}`}
          type={type || "button"}
        >
          <ButtonBody
            icon={icon}
            text={text}
            variant={variant}
            attributes={attributes}
            borderAttributes={borderAttributes}
            lightIcon={lightIcon}
          />
        </button>
      )}
    </>
  );
}

// function used for styling the different variants of buttons
function ButtonBody({
  icon,
  text,
  variant,
  attributes,
  borderAttributes,
  lightIcon,
}) {
  const theme = useStore((store) => store.theme);

  return (
    <span
      className={`flex gap-[6px] relative rounded-[2px] uppercase font-bold justify-center ${
        variant === "tertiary"
          ? `${theme === "light" ? "border-black/20" : "border-white/20"}`
          : "bg-game-grad"
      } ${attributes} ${variant === "tertiary" && borderAttributes} ${
        !variant && "text-white"
      }`}
    >
      {icon && (
        <img
          src={theme === "light" ? (lightIcon ? lightIcon : icon) : icon}
          alt="icon"
          className="w-[12px] object-contain relative z-10"
        />
      )}
      <p className="relative z-10">{text}</p>
      {variant === "secondary" && (
        <div
          className={`absolute inset-[2px] ${
            theme === "light" ? "bg-back-light" : "bg-back-dark"
          }`}
        />
      )}
    </span>
  );
}

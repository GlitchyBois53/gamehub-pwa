import { useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";

export default function SquareButton({
  handleClick,
  isLoading,
  variant,
  isDisabled,
}) {
  const loadingIcon = "/loading-white.svg";

  let icon = "/add-friend-icon.png";
  let color = ["#00D1FF", "#7E43DF"];
  let text = "Add";

  const [isHovered, setIsHovered] = useState(false);

  if (variant === "check") {
    icon = "/checkmark.png";
    color = ["#00FF1A", "#00C514"];
    text = "Accept";
  }

  if (variant === "delete") {
    icon = "/close-icon-dark.png";
    color = ["#FF4040", "#F00101"];
    text = "Remove";
  }

  if (!variant && isDisabled) {
    text = "Added";
  }

  return (
    <button
      onClick={isLoading ? null : handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: `linear-gradient(94deg, ${color[0]} 0.48%, ${color[1]} 100%)`,
      }}
      className={`h-[35px] relative md:aspect-square flex items-center gap-[8px] px-[12px] md:px-0 justify-center rounded-[2px] game-shadow ${
        isLoading && "cursor-not-allowed"
      } ${isDisabled && "opacity-40"}`}
    >
      <img
        src={isLoading ? loadingIcon : icon}
        alt=""
        className={`w-[12px] object-contain ${isLoading && "animate-spin"}`}
      />
      <p className="md:hidden text-[12px] tracking-[0.56px] uppercase font-semibold translate-y-[-0.5px]">
        {text}
      </p>
      <AnimatePresence>
        {isHovered && (
          <m.span
            initial={{ opacity: 0, scale: 0, transformOrigin: "top" }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.1 }}
            className="hidden md:block absolute text-white bottom-[-24.5px] text-[10px] tracking-[0.52px] uppercase font-semibold py-[2px] px-[8px] rounded-[2px]"
            style={{
              background: `linear-gradient(94deg, ${color[0]} 0.48%, ${color[1]} 100%)`,
            }}
          >
            {text}
          </m.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function SquareButton({
  handleClick,
  isLoading,
  variant,
  isDisabled,
}) {
  const loadingIcon = "/loading-white.svg";

  let icon = "/add-friend-icon.png";
  let color = ["#00D1FF", "#7E43DF"];

  if (variant === "check") {
    icon = "/checkmark.png";
    color = ["#00FF1A", "#00C514"];
  }

  if (variant === "delete") {
    icon = "/close-icon-dark.png";
    color = ["#FF4040", "#F00101"];
  }

  return (
    <button
      onClick={isLoading ? null : handleClick}
      style={{
        background: `linear-gradient(94deg, ${color[0]} 0.48%, ${color[1]} 100%)`,
      }}
      className={`w-[35px] aspect-square flex items-center justify-center rounded-[2px] game-shadow ${
        isLoading && "cursor-not-allowed"
      } ${isDisabled && "opacity-40"}`}
    >
      <img
        src={isLoading ? loadingIcon : icon}
        alt=""
        className={`w-[12px] object-contain ${isLoading && "animate-spin"}`}
      />
    </button>
  );
}

'use client';

import Link from 'next/link';
import { useStore } from '../../app/store';

export default function Button({
  icon,
  lightIcon,
  text,
  handleClick,
  isLink,
  href,
  variant,
  type,
  isLoading,
  // setting default values for the attributes
  attributes = 'px-[18px] py-[8px] text-[12px] tracking-[0.72px]',
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
            lightIcon={lightIcon}
            isLoading={isLoading}
          />
        </Link>
      ) : (
        <button
          onClick={handleClick}
          className={`block ${buttonWidth || 'w-max'}`}
          type={type || 'button'}
        >
          <ButtonBody
            icon={icon}
            text={text}
            variant={variant}
            attributes={attributes}
            lightIcon={lightIcon}
            isLoading={isLoading}
          />
        </button>
      )}
    </>
  );
}

// function used for styling the different variants of buttons
function ButtonBody({ icon, text, variant, attributes, lightIcon, isLoading }) {
  const theme = useStore((store) => store.theme);

  const whiteLoader = '/loading-white.svg';
  const blackLoader = '/loading-black.svg';

  const iconBase =
    theme === 'light'
      ? lightIcon
        ? isLoading
          ? blackLoader
          : lightIcon
        : isLoading
        ? whiteLoader
        : icon
      : isLoading
      ? whiteLoader
      : icon;

  return (
    <span
      className={`flex gap-[6px] relative rounded-[2px] uppercase font-bold justify-center ${
        variant === 'tertiary'
          ? `${theme === 'light' ? 'bg-black/20' : 'bg-white/20'}`
          : 'bg-game-grad'
      } ${attributes} ${variant === 'tertiary' && ''} ${
        !variant && 'text-white'
      }`}
    >
      {icon && (
        <img
          src={iconBase}
          alt="icon"
          className={`w-[12px] object-contain relative z-10 ${
            isLoading && 'animate-spin'
          }`}
        />
      )}
      <p className="relative z-10">{text}</p>
      {variant && (
        <div
          className={`absolute inset-[2px] ${
            theme === 'light' ? 'bg-back-light' : 'bg-back-dark'
          }`}
        />
      )}
    </span>
  );
}
